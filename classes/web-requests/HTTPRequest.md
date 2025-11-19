# HTTPRequest

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest`

**Extends:** `Object`

**Since:** `1.1.8`

The `HTTPRequest` class is a Library and API helper in JSMacros that provides functionality for making HTTP requests to web servers and APIs. It supports common HTTP methods including GET, POST, PUT, and custom methods, with flexible header management and timeout configuration. This class enables scripts to communicate with external web services, fetch data, and send information over the internet.

The class uses Java's built-in `HttpURLConnection` under the hood and provides a simple, chainable API for building and executing HTTP requests. It includes support for both string and binary data transmission, making it suitable for various web API interactions.

## Overview

The `HTTPRequest` class provides a straightforward way to perform HTTP operations from JSMacros scripts:

- **HTTP Method Support:** GET, POST, PUT, and custom HTTP methods
- **Header Management:** Add custom headers to requests
- **Data Types:** Support for both string and binary data payloads
- **Timeout Control:** Configurable connection and read timeouts
- **Response Handling:** Structured response objects with text, binary, and header access

**Key Features:**
- Chainable method calls for fluent API design
- Automatic content-length header calculation
- UTF-8 string encoding by default
- Structured response objects with status codes and headers
- Support for both text and binary response data

## Constructors

### `new HTTPRequest(url)`
Creates a new HTTPRequest instance for the specified URL.

**Parameters:**
- `url` (String): The target URL to make requests to

**Throws:** `IOException` - If the URL is malformed or invalid

**Example:**
```javascript
// Create an HTTP request instance
const request = new HTTPRequest("https://api.example.com/data");
```

## Public Fields

## Methods

### Header Configuration Methods

#### `addHeader(key, value)`
Adds a custom header to the request. If a header with the same key already exists, it will be overwritten.

**Parameters:**
- `key` (String): The header name (e.g., "Content-Type", "Authorization")
- `value` (String): The header value

**Returns:** `HTTPRequest` - Self for chaining

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/data")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer your-token-here")
    .addHeader("User-Agent", "JsMacros/1.0");
```

#### `setConnectTimeout(timeout)`
Sets the connection timeout for the HTTP request.

**Parameters:**
- `timeout` (int): Connection timeout in milliseconds

**Returns:** `HTTPRequest` - Self for chaining

**Since:** 1.8.6

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/data")
    .setConnectTimeout(5000); // 5 seconds
```

#### `setReadTimeout(timeout)`
Sets the read timeout for the HTTP request.

**Parameters:**
- `timeout` (int): Read timeout in milliseconds

**Returns:** `HTTPRequest` - Self for chaining

**Since:** 1.8.6

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/data")
    .setReadTimeout(10000); // 10 seconds
```

### HTTP Methods

#### `get()`
Performs an HTTP GET request to the configured URL.

**Returns:** `Response` - The response object containing status code, headers, and body

**Throws:** `IOException` - If the request fails due to network issues or server errors

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/users")
    .addHeader("Accept", "application/json");

try {
    const response = request.get();
    Chat.log("Response code: " + response.responseCode);
    Chat.log("Response body: " + response.text());
} catch (e) {
    Chat.log("GET request failed: " + e.message);
}
```

#### `post(data)`
Performs an HTTP POST request with the specified data.

**Parameters:**
- `data` (String): The request body data to send

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/users")
    .addHeader("Content-Type", "application/json");

const userData = JSON.stringify({
    name: "Steve",
    email: "steve@example.com"
});

try {
    const response = request.post(userData);
    Chat.log("Created user with status: " + response.responseCode);
    Chat.log("Response: " + response.text());
} catch (e) {
    Chat.log("POST request failed: " + e.message);
}
```

#### `post(data)`
Performs an HTTP POST request with binary data.

**Parameters:**
- `data` (byte[]): The binary data to send

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.4

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/upload")
    .addHeader("Content-Type", "application/octet-stream");

// Example: Upload image data (you would get this from a file or other source)
const fileData = new Packages.java.io.FileInputStream("image.png").readAllBytes();

try {
    const response = request.post(fileData);
    Chat.log("Upload completed with status: " + response.responseCode);
} catch (e) {
    Chat.log("POST binary request failed: " + e.message);
}
```

#### `put(data)`
Performs an HTTP PUT request with the specified data.

**Parameters:**
- `data` (String): The request body data to send

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.4

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/users/123")
    .addHeader("Content-Type", "application/json");

const updateData = JSON.stringify({
    name: "Updated Name",
    email: "updated@example.com"
});

try {
    const response = request.put(updateData);
    Chat.log("Updated user with status: " + response.responseCode);
    Chat.log("Response: " + response.text());
} catch (e) {
    Chat.log("PUT request failed: " + e.message);
}
```

#### `put(data)`
Performs an HTTP PUT request with binary data.

**Parameters:**
- `data` (byte[]): The binary data to send

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.4

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/files/123")
    .addHeader("Content-Type", "application/octet-stream");

const fileData = new Packages.java.io.FileInputStream("document.pdf").readAllBytes();

try {
    const response = request.put(fileData);
    Chat.log("File uploaded with status: " + response.responseCode);
} catch (e) {
    Chat.log("PUT binary request failed: " + e.message);
}
```

#### `send(method)`
Performs an HTTP request with a custom method and no body.

**Parameters:**
- `method` (String): The HTTP method to use (e.g., "DELETE", "PATCH", "HEAD")

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.6

**Example:**
```javascript
// DELETE request
const deleteRequest = new HTTPRequest("https://api.example.com/users/123");

try {
    const response = deleteRequest.send("DELETE");
    Chat.log("User deleted with status: " + response.responseCode);
} catch (e) {
    Chat.log("DELETE request failed: " + e.message);
}

// HEAD request
const headRequest = new HTTPRequest("https://api.example.com/data");

try {
    const response = headRequest.send("HEAD");
    Chat.log("HEAD request status: " + response.responseCode);
    // Headers are available via response.headers
} catch (e) {
    Chat.log("HEAD request failed: " + e.message);
}
```

#### `send(method, data)`
Performs an HTTP request with a custom method and string data.

**Parameters:**
- `method` (String): The HTTP method to use
- `data` (String): The request body data

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.4

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/users/123")
    .addHeader("Content-Type", "application/json");

const patchData = JSON.stringify({
    status: "active"
});

try {
    const response = request.send("PATCH", patchData);
    Chat.log("PATCH request status: " + response.responseCode);
    Chat.log("Response: " + response.text());
} catch (e) {
    Chat.log("PATCH request failed: " + e.message);
}
```

#### `send(method, data)`
Performs an HTTP request with a custom method and binary data.

**Parameters:**
- `method` (String): The HTTP method to use
- `data` (byte[]): The binary data to send

**Returns:** `Response` - The response object

**Throws:** `IOException` - If the request fails

**Since:** 1.8.4

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/upload/123")
    .addHeader("Content-Type", "application/octet-stream");

const fileData = new Packages.java.io.FileInputStream("update.bin").readAllBytes();

try {
    const response = request.send("PATCH", fileData);
    Chat.log("Binary PATCH status: " + response.responseCode);
} catch (e) {
    Chat.log("Binary PATCH request failed: " + e.message);
}
```

## Response Class

The HTTPRequest class includes a nested `Response` class that encapsulates HTTP responses.

### Response Fields

### Response Methods

#### `text()`
Returns the response body as a UTF-8 encoded string. The result is cached after the first call for efficiency.

**Returns:** `String` - The response body as text

**Example:**
```javascript
const response = request.get();
const body = response.text();
Chat.log("Response body: " + body);

// Parse JSON response
try {
    const data = JSON.parse(body);
    Chat.log("Parsed JSON: " + JSON.stringify(data));
} catch (e) {
    Chat.log("Failed to parse JSON: " + e.message);
}
```

#### `byteArray()`
Returns the response body as a byte array. Useful for handling binary responses like images, files, or other non-text data.

**Returns:** `byte[]` - The response body as binary data

**Throws:** `IOException` - If reading the binary data fails

**Since:** 1.2.2

**Example:**
```javascript
const response = request.get();
const binaryData = response.byteArray();

Chat.log("Received " + binaryData.length + " bytes of data");

// For demonstration, convert first few bytes to hex
const hexBytes = [];
for (let i = 0; i < Math.min(16, binaryData.length); i++) {
    hexBytes.push(binaryData[i].toString(16).padStart(2, '0'));
}
Chat.log("First " + hexBytes.length + " bytes: " + hexBytes.join(' '));
```

#### `json()`
**Deprecated:** This method is deprecated and should not be used. Instead, use `text()` and parse the JSON in your JavaScript code.

**Returns:** `Object` - Always returns `null`

## Usage Examples

### Example 1: Simple GET Request

```javascript
function fetchWeatherData(city) {
    const apiKey = "your-api-key-here";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const request = new HTTPRequest(url)
            .addHeader("User-Agent", "JsMacros-Weather-App/1.0");

        const response = request.get();

        if (response.responseCode === 200) {
            const data = JSON.parse(response.text());
            Chat.log(`Weather in ${city}:`);
            Chat.log(`Temperature: ${data.main.temp}°K`);
            Chat.log(`Description: ${data.weather[0].description}`);
            Chat.log(`Humidity: ${data.main.humidity}%`);
        } else {
            Chat.log(`Failed to fetch weather: HTTP ${response.responseCode}`);
        }
    } catch (e) {
        Chat.log("Weather request failed: " + e.message);
    }
}

fetchWeatherData("London");
```

### Example 2: POST Request with JSON Data

```javascript
function createUser(userData) {
    try {
        const request = new HTTPRequest("https://jsonplaceholder.typicode.com/users")
            .addHeader("Content-Type", "application/json")
            .addHeader("Accept", "application/json");

        const jsonData = JSON.stringify(userData);
        const response = request.post(jsonData);

        Chat.log("Created user with status: " + response.responseCode);

        if (response.responseCode === 201) {
            const createdUser = JSON.parse(response.text());
            Chat.log("User ID: " + createdUser.id);
            Chat.log("User name: " + createdUser.name);
            return createdUser;
        }
    } catch (e) {
        Chat.log("Failed to create user: " + e.message);
    }
    return null;
}

const newUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1-555-123-4567"
};

createUser(newUser);
```

### Example 3: File Download

```javascript
function downloadFile(url, filename) {
    try {
        const request = new HTTPRequest(url)
            .addHeader("User-Agent", "JsMacros-Downloader/1.0")
            .setConnectTimeout(10000)
            .setReadTimeout(30000);

        Chat.log("Downloading: " + url);
        const response = request.get();

        if (response.responseCode === 200) {
            const fileData = response.byteArray();

            // Save to file (using Java I/O)
            const filePath = "downloads/" + filename;
            const outputStream = new Packages.java.io.FileOutputStream(filePath);
            outputStream.write(fileData);
            outputStream.close();

            Chat.log(`Downloaded ${fileData.length} bytes to ${filePath}`);
            return true;
        } else {
            Chat.log(`Download failed: HTTP ${response.responseCode}`);
            return false;
        }
    } catch (e) {
        Chat.log("Download error: " + e.message);
        return false;
    }
}

// Download a small text file for testing
downloadFile("https://example.com/test.txt", "downloaded_file.txt");
```

### Example 4: API Authentication

```javascript
function makeAuthenticatedRequest(endpoint, token) {
    try {
        const request = new HTTPRequest("https://api.github.com" + endpoint)
            .addHeader("Authorization", "token " + token)
            .addHeader("Accept", "application/vnd.github.v3+json")
            .addHeader("User-Agent", "JsMacros-GitHub-Client/1.0");

        const response = request.get();

        Chat.log("Request to " + endpoint + " returned status: " + response.responseCode);

        if (response.responseCode === 200) {
            return JSON.parse(response.text());
        } else if (response.responseCode === 401) {
            Chat.log("Authentication failed - check your token");
        } else if (response.responseCode === 403) {
            Chat.log("Rate limited or insufficient permissions");
        }

        return null;
    } catch (e) {
        Chat.log("Authenticated request failed: " + e.message);
        return null;
    }
}

// Example usage (replace with actual token)
const githubToken = "your-github-token-here";
const user = makeAuthenticatedRequest("/user", githubToken);

if (user) {
    Chat.log("GitHub user: " + user.login);
    Chat.log("Name: " + user.name);
    Chat.log("Public repos: " + user.public_repos);
}
```

### Example 5: Error Handling and Retry Logic

```javascript
function robustRequest(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            Chat.log(`Attempt ${attempt} of ${maxRetries}`);

            const request = new HTTPRequest(url)
                .addHeader("User-Agent", "JsMacros-Robust-Client/1.0")
                .setConnectTimeout(5000)
                .setReadTimeout(15000);

            const response = request.get();

            // Handle different status codes
            if (response.responseCode >= 200 && response.responseCode < 300) {
                Chat.log("Request successful!");
                return response.text();
            } else if (response.responseCode === 404) {
                Chat.log("Resource not found (404) - not retrying");
                return null;
            } else if (response.responseCode === 429) {
                Chat.log("Rate limited (429) - waiting before retry");
                if (attempt < maxRetries) {
                    // Simple backoff - wait 2^attempt seconds
                    const waitTime = Math.pow(2, attempt) * 1000;
                    Chat.log("Waiting " + waitTime + "ms...");
                    Thread.sleep(waitTime);
                    continue;
                }
            } else {
                Chat.log(`HTTP ${response.responseCode} - attempt ${attempt}`);
                if (attempt < maxRetries) {
                    Chat.log("Retrying in 2 seconds...");
                    Thread.sleep(2000);
                }
            }
        } catch (e) {
            Chat.log(`Attempt ${attempt} failed: ${e.message}`);
            if (attempt < maxRetries) {
                Chat.log("Retrying in 2 seconds...");
                Thread.sleep(2000);
            }
        }
    }

    Chat.log("All attempts failed");
    return null;
}

const result = robustRequest("https://httpbin.org/delay/2");
if (result) {
    Chat.log("Final result: " + result.substring(0, 100) + "...");
}
```

### Example 6: Custom HTTP Methods

```javascript
function demonstrateCustomMethods() {
    const baseUrl = "https://httpbin.org";

    try {
        // HEAD request to get headers only
        const headRequest = new HTTPRequest(baseUrl + "/get");
        const headResponse = headRequest.send("HEAD");
        Chat.log("HEAD request status: " + headResponse.responseCode);

        // OPTIONS request to see allowed methods
        const optionsRequest = new HTTPRequest(baseUrl + "/get");
        const optionsResponse = optionsRequest.send("OPTIONS");
        Chat.log("OPTIONS request status: " + optionsResponse.responseCode);

        // PATCH request with partial data
        const patchRequest = new HTTPRequest(baseUrl + "/patch")
            .addHeader("Content-Type", "application/json");
        const patchData = JSON.stringify({
            operation: "partial_update",
            fields: ["status", "timestamp"]
        });
        const patchResponse = patchRequest.send("PATCH", patchData);
        Chat.log("PATCH request status: " + patchResponse.responseCode);

        if (patchResponse.responseCode === 200) {
            const result = JSON.parse(patchResponse.text());
            Chat.log("PATCH echo: " + JSON.stringify(result.json));
        }

    } catch (e) {
        Chat.log("Custom method request failed: " + e.message);
    }
}

demonstrateCustomMethods();
```

### Example 7: Streaming Large Data

```javascript
function processLargeDataset() {
    try {
        // Request a large JSON dataset
        const request = new HTTPRequest("https://jsonplaceholder.typicode.com/photos")
            .addHeader("Accept", "application/json")
            .setConnectTimeout(10000)
            .setReadTimeout(30000);

        Chat.log("Fetching large dataset...");
        const response = request.get();

        if (response.responseCode === 200) {
            const data = JSON.parse(response.text());
            Chat.log(`Received ${data.length} items`);

            // Process data in chunks to avoid memory issues
            const chunkSize = 100;
            let processedCount = 0;

            for (let i = 0; i < data.length; i += chunkSize) {
                const chunk = data.slice(i, i + chunkSize);

                // Process this chunk
                for (const item of chunk) {
                    if (item.thumbnailUrl && item.title) {
                        processedCount++;

                        // Only log first few items to avoid spam
                        if (processedCount <= 5) {
                            Chat.log(`Item ${processedCount}: ${item.title.substring(0, 30)}...`);
                        }
                    }
                }

                // Yield to prevent blocking
                if (i % 500 === 0) {
                    Chat.log(`Processed ${Math.min(i + chunkSize, data.length)} of ${data.length} items`);
                    Thread.sleep(10); // Small delay
                }
            }

            Chat.log(`Processing complete. Handled ${processedCount} valid items.`);
        } else {
            Chat.log(`Failed to fetch dataset: HTTP ${response.responseCode}`);
        }
    } catch (e) {
        Chat.log("Large dataset processing failed: " + e.message);
    }
}

processLargeDataset();
```

## Common HTTP Status Codes

When working with HTTP requests, you'll encounter various status codes. Here are the most common ones:

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **204 No Content** - Request successful, no content returned
- **400 Bad Request** - Invalid request syntax or parameters
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Server refuses to fulfill request
- **404 Not Found** - Requested resource doesn't exist
- **405 Method Not Allowed** - HTTP method not supported for this endpoint
- **429 Too Many Requests** - Rate limiting exceeded
- **500 Internal Server Error** - Server encountered an error
- **502 Bad Gateway** - Invalid response from upstream server
- **503 Service Unavailable** - Server temporarily unavailable

## Security Considerations

1. **HTTPS Usage:** Always prefer HTTPS URLs when available to encrypt data in transit.

2. **API Keys and Tokens:** Never hardcode sensitive credentials in scripts. Consider using environment variables or configuration files.

3. **Input Validation:** Validate and sanitize data before sending it in requests, especially when constructing URLs from user input.

4. **Rate Limiting:** Be respectful of API rate limits to avoid being blocked.

5. **Error Information:** Avoid logging sensitive error details that might expose credentials or system information.

## Performance Tips

1. **Connection Reuse:** Create multiple requests to the same domain when possible to benefit from connection reuse.

2. **Timeout Settings:** Set appropriate timeouts to prevent scripts from hanging indefinitely.

3. **Binary Data:** Use binary methods (`post(byte[])`, `byteArray()`) for file transfers to avoid encoding overhead.

4. **Response Caching:** Cache responses when appropriate to reduce redundant requests.

5. **Chunking:** Process large responses in chunks to reduce memory usage.

## Troubleshooting

### Common Issues

1. **SSL/TLS Errors:** If you encounter SSL certificate issues, the server may have certificate problems.

2. **Timeout Errors:** Increase timeout values with `setConnectTimeout()` and `setReadTimeout()`.

3. **Connection Refused:** Check if the target URL is correct and the server is accessible.

4. **404 Errors:** Verify the endpoint URL and HTTP method are correct.

5. **JSON Parsing Errors:** Use `try-catch` blocks when parsing JSON responses.

### Debugging Tips

```javascript
function debugHttpRequest(url) {
    try {
        Chat.log("=== HTTP Request Debug ===");
        Chat.log("URL: " + url);

        const request = new HTTPRequest(url)
            .addHeader("User-Agent", "JsMacros-Debug/1.0");

        Chat.log("Headers: " + request.headers.toString());

        const startTime = System.currentTimeMillis();
        const response = request.get();
        const endTime = System.currentTimeMillis();

        Chat.log("Response time: " + (endTime - startTime) + "ms");
        Chat.log("Status code: " + response.responseCode);

        Chat.log("Response headers:");
        for (const [key, values] of response.headers.entrySet()) {
            for (const value of values) {
                Chat.log("  " + key + ": " + value);
            }
        }

        const body = response.text();
        Chat.log("Response length: " + body.length + " characters");
        Chat.log("Response preview: " + body.substring(0, 200) + "...");

    } catch (e) {
        Chat.log("Debug request failed: " + e.message);
        Chat.log("Stack trace: " + e.stack);
    }
}
```

## Related Classes

- `URL` - Java URL class used for connection management
- `HttpURLConnection` - Underlying Java class for HTTP connections
- `Map` - Used for headers storage
- `InputStream` - Used for response data streaming

## Version History

- **1.1.8:** Initial release with GET, POST methods and basic header support
- **1.2.2:** Added `byteArray()` method for binary response handling
- **1.8.4:** Added PUT method, custom method support with `send()`, and binary data support
- **1.8.6:** Added `send()` method without data, improved timeout configuration with `setConnectTimeout()` and `setReadTimeout()`
- **Current:** Enhanced error handling and performance optimizations

