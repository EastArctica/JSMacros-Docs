# Request

Functions for making HTTP requests and managing WebSockets. Accessible from scripts via the global `Request` variable.

## Methods
- [Request.create](#requestcreate)
- [Request.get](#requestget)
- [Request.post](#requestpost)
- [Request.createWS](#requestcreatews)
- [Request.createWS2](#requestcreatews2)

### Request.create
```js
const req = Request.create("https://api.example.com/data");
req.setHeader("Authorization", "Bearer my-token");
req.setMethod("PUT");
req.setData("{ \"key\": \"value\" }");

const response = req.send();
Chat.log(`Response Code: ${response.getStatusCode()}`);
```
Creates a configurable `HTTPRequest` handler. This allows for more complex requests where you can specify the method, headers, and body before sending.

**Params**
1. `url: string`: The URL to target.

**Returns**
* `HTTPRequest`: A new HTTP request handler object.

### Request.get
```js
// Simple GET request
const response = Request.get("https://api.github.com/zen");
if (response.isSuccess()) {
    Chat.log(`GitHub Zen: ${response.getBody()}`);
} else {
    Chat.log(`Error: ${response.getStatusCode()}`);
}

// GET request with custom headers
const headers = JavaUtils.createHashMap();
headers.put("Accept", "application/json");
const userResponse = Request.get("https://api.github.com/users/wagyourtail", headers);
const userData = JSON.parse(userResponse.getBody());
Chat.log(`User Login: ${userData.login}`);
```
A shortcut to send an HTTP GET request.

**Params**
1. `url: string`: The URL to send the request to.
2. `headers?: java.util.Map<string, string>`: An optional map of request headers.

**Returns**
* `HTTPRequest.Response`: An object containing the response data, including status code and body.

#### Overloads
- `Request.get(url: string)`
- `Request.get(url: string, headers: java.util.Map<string, string>)`

### Request.post
```js
const url = "https://httpbin.org/post";
const postData = JSON.stringify({
    username: "Steve",
    score: 100
});

const headers = JavaUtils.createHashMap();
headers.put("Content-Type", "application/json");

const response = Request.post(url, postData, headers);
Chat.log(`Response from server: ${response.getBody()}`);
```
A shortcut to send an HTTP POST request.

**Params**
1. `url: string`: The URL to send the request to.
2. `data: string`: The data/body to send with the request.
3. `headers?: java.util.Map<string, string>`: An optional map of request headers.

**Returns**
* `HTTPRequest.Response`: An object containing the response data.

#### Overloads
- `Request.post(url: string, data: string)`
- `Request.post(url: string, data: string, headers: java.util.Map<string, string>)`

### Request.createWS
```js
const ws = Request.createWS("wss://echo.websocket.events");

ws.onOpen(JavaWrapper.methodToJava(() => {
    Chat.log("WebSocket connected!");
    ws.send("Hello from JSMacros!");
}));

ws.onMessage(JavaWrapper.methodToJava((message) => {
    Chat.log(`WebSocket received: ${message}`);
    ws.close(1000, "Task completed");
}));

ws.onClose(JavaWrapper.methodToJava((code, reason) => {
    Chat.log(`WebSocket closed! Code: ${code}, Reason: ${reason}`);
}));

ws.onError(JavaWrapper.methodToJava((error) => {
    Chat.log(`WebSocket error: ${error.getMessage()}`);
}));

ws.connect();
```
Creates a `Websocket` handler for persistent, real-time, two-way communication with a server.

**Params**
1. `url: string`: The WebSocket URL (usually starting with `ws://` or `wss://`).

**Returns**
* `Websocket`: A new WebSocket handler object.

### Request.createWS2
**Deprecated:** Use `Request.createWS()` instead.

An older method for creating a WebSocket handler.

**Params**
1. `url: string`: The WebSocket URL.

**Returns**
* `Websocket`