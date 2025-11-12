# Time

Functions for time-related operations, such as getting the current system time and pausing script execution. Accessible from scripts via the global `Time` variable.

## Methods
- [Time.time](#timetime)
- [Time.sleep](#timesleep)

### Time.time
```js
const startTime = Time.time();
// ... do some work ...
const endTime = Time.time();
const duration = endTime - startTime;
Chat.log(`The operation took ${duration} ms.`);
```
Gets the current system time in milliseconds since the Unix epoch (January 1, 1970 UTC).

**Params**
* `(none)`

**Returns**
* `long`: The current time in milliseconds.

### Time.sleep
```js
Chat.log("Waiting for 2 seconds...");
Time.sleep(2000); // 2000 milliseconds = 2 seconds
Chat.log("Done waiting!");
```
Pauses the execution of the current script thread for the specified duration.

**Params**
1. `millis: long`: The number of milliseconds to sleep.

**Returns**
* `void`

**Notes**
This method blocks the current script thread. It should not be used in a synchronous callback (one created with `JavaWrapper.methodToJava()`) that runs on the main game thread (e.g., a button click), as it will freeze the game. It is safe to use in the main body of your script or in asynchronous event listeners.