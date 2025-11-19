# HTTPRequest$Response

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.HTTPRequest$Response`

**Package:** `xyz.wagyourtail.jsmacros.core.library.impl.classes`

**Since:** `1.1.8`

## Overview

The `Response` class is a nested class within `HTTPRequest` that encapsulates HTTP response data including status codes, headers, and response body. This class provides structured access to all aspects of an HTTP response, making it easy to handle different types of responses from web servers and APIs.

The Response class is returned by all HTTP request methods (`get()`, `post()`, `put()`, `send()`) and contains both metadata about the response and methods to access the response content in various formats.

## Class Structure

```java
public static class Response {
    public final int responseCode;
    public final Map<String, List<String>> headers;

    // Response body access methods
    public String text()
    public byte[] byteArray()
    public Object json() // deprecated
}
```

## Fields

### `responseCode`
**Type:** `int`

The HTTP status code returned by the server. Common codes include:
- 200: OK (successful request)
- 201: Created (resource created successfully)
- 400: Bad Request (invalid request)
- 401: Unauthorized (authentication required)
- 403: Forbidden (access denied)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (server error)

**Access:** `public final`

**Example:**
```javascript
const request = new HTTPRequest("https://api.example.com/data");
const response = request.get();

if (response.responseCode === 200) {
    Chat.log("Request successful!");
} else if (response.responseCode === 404) {
    Chat.log("Resource not found");
}
```

### `headers`
**Type:** `Map<String, List<String>>`

A map containing all response headers. Each header name maps to a list of values since headers can have multiple values.

**Access:** `public final`

**Example:**
```javascript
const response = request.get();

// Access specific header
const contentType = response.headers.get("content-type");
if (contentType && contentType.length > 0) {
    Chat.log("Content type: " + contentType[0]);
}

// Print all headers
for (const [key, values] of response.headers.entrySet()) {
    for (const value of values) {
        Chat.log(`${key}: ${value}`);
    }
}
```

## Methods

### `text()`
**Returns:** `String` - The response body as UTF-8 encoded text

Returns the response body as a string. The result is cached after the first call for efficiency. This is the most commonly used method for accessing text-based response data.

**Caching:** The result is cached after the first call to avoid multiple conversions.

**Example:**
```javascript
const response = request.get();
const body = response.text();

Chat.log("Response body length: " + body.length);
Chat.log("First 100 characters: " + body.substring(0, 100));

// Parse JSON response
try {
    const data = JSON.parse(body);
    Chat.log("Parsed JSON keys: " + Object.keys(data));
} catch (e) {
    Chat.log("Failed to parse JSON: " + e.message);
}
```

### `byteArray()`
**Returns:** `byte[]` - The response body as binary data

Returns the response body as a byte array. Useful for handling binary responses like images, files, or other non-text data.

**Throws:** `IOException` - If reading the binary data fails

**Since:** `1.2.2`

**Example:**
```javascript
const response = request.get();
const binaryData = response.byteArray();

Chat.log("Received " + binaryData.length + " bytes");

// For demonstration, show first few bytes as hex
const hexBytes = [];
for (let i = 0; i < Math.min(16, binaryData.length); i++) {
    hexBytes.push(binaryData[i].toString(16).padStart(2, '0'));
}
Chat.log("First bytes: " + hexBytes.join(' '));

// Save binary data to file
try {
    const outputStream = new Packages.java.io.FileOutputStream("downloaded_file.bin");
    outputStream.write(binaryData);
    outputStream.close();
    Chat.log("File saved successfully");
} catch (e) {
    Chat.log("Failed to save file: " + e.message);
}
```

### `json()` (Deprecated)
**Returns:** `Object` - Always returns `null`

**Deprecated:** This method is deprecated and should not be used. Instead, use `text()` and parse the JSON in your JavaScript code.

**Example of correct JSON handling:**
```javascript
const response = request.get();
const body = response.text();

try {
    const jsonData = JSON.parse(body);
    Chat.log("Successfully parsed JSON");
    Chat.log("Data keys: " + Object.keys(jsonData));
} catch (e) {
    Chat.log("Failed to parse JSON: " + e.message);
    Chat.log("Response content: " + body.substring(0, 200));
}
```

## Usage Examples

### Example 1: Basic Response Handling
```javascript
function handleApiRequest(url) {
    try {
        const request = new HTTPRequest(url)
            .addHeader("User-Agent", "JsMacros-Client/1.0")
            .addHeader("Accept", "application/json");

        const response = request.get();

        Chat.log("=== API Response Analysis ===");
        Chat.log("URL: " + url);
        Chat.log("Status Code: " + response.responseCode);
        Chat.log("Headers count: " + response.headers.size());

        // Analyze status code
        switch (response.responseCode) {
            case 200:
                Chat.log("✅ Request successful");
                break;
            case 201:
                Chat.log("✅ Resource created");
                break;
            case 204:
                Chat.log("✅ No content returned");
                break;
            case 400:
                Chat.log("❌ Bad request - check parameters");
                return null;
            case 401:
                Chat.log("❌ Unauthorized - check credentials");
                return null;
            case 403:
                Chat.log("❌ Forbidden - insufficient permissions");
                return null;
            case 404:
                Chat.log("❌ Not found - resource doesn't exist");
                return null;
            case 500:
                Chat.log("❌ Server error - try again later");
                return null;
            default:
                Chat.log(`⚠️ Unexpected status code: ${response.responseCode}`);
        }

        // Check content type
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.length > 0) {
            Chat.log("Content-Type: " + contentType[0]);
        }

        // Get response body
        const body = response.text();
        Chat.log("Response length: " + body.length + " characters");

        if (body.length > 0) {
            // Show preview
            const preview = body.substring(0, Math.min(200, body.length));
            Chat.log("Preview: " + preview + (body.length > 200 ? "..." : ""));

            // Try to parse as JSON
            if (contentType && contentType[0].includes("application/json")) {
                try {
                    const jsonData = JSON.parse(body);
                    Chat.log("JSON parsed successfully");
                    return jsonData;
                } catch (e) {
                    Chat.log("Failed to parse JSON: " + e.message);
                }
            }

            return body;
        }

        return null;

    } catch (e) {
        Chat.log("Request failed: " + e.message);
        return null;
    }
}

// Test with a public API
const result = handleApiRequest("https://jsonplaceholder.typicode.com/posts/1");
if (result) {
    Chat.log("API call successful!");
}
```

### Example 2: File Download with Progress
```javascript
function downloadFile(url, filename, showProgress = true) {
    try {
        Chat.log(`📥 Starting download: ${url}`);

        const request = new HTTPRequest(url)
            .addHeader("User-Agent", "JsMacros-Downloader/1.0")
            .setConnectTimeout(10000)
            .setReadTimeout(30000);

        const startTime = Date.now();
        const response = request.get();

        // Check response
        if (response.responseCode !== 200) {
            Chat.log(`❌ Download failed with status: ${response.responseCode}`);
            return false;
        }

        // Get file data
        const fileData = response.byteArray();
        const fileSize = fileData.length;
        const downloadTime = Date.now() - startTime;

        Chat.log(`✅ Download completed!`);
        Chat.log(`📊 File size: ${fileSize.toLocaleString()} bytes`);
        Chat.log(`⏱️ Download time: ${downloadTime}ms`);
        Chat.log(`🚀 Speed: ${Math.round(fileSize / (downloadTime / 1000))} bytes/sec`);

        // Save file
        const filePath = "downloads/" + filename;
        try {
            const outputStream = new Packages.java.io.FileOutputStream(filePath);
            outputStream.write(fileData);
            outputStream.close();

            Chat.log(`💾 File saved to: ${filePath}`);

            // Verify file size
            const savedFile = new Packages.java.io.File(filePath);
            if (savedFile.exists() && savedFile.length() === fileSize) {
                Chat.log("✅ File verification successful");
                return true;
            } else {
                Chat.log("❌ File verification failed");
                return false;
            }

        } catch (e) {
            Chat.log(`❌ Failed to save file: ${e.message}`);
            return false;
        }

    } catch (e) {
        Chat.log(`❌ Download error: ${e.message}`);
        return false;
    }
}

// Download a test image
downloadFile("https://via.placeholder.com/150", "test_image.png");
```

### Example 3: Response Header Analysis
```javascript
function analyzeResponseHeaders(url) {
    try {
        Chat.log(`🔍 Analyzing headers for: ${url}`);

        const request = new HTTPRequest(url);
        const response = request.get();

        Chat.log("=== Response Header Analysis ===");
        Chat.log(`Status Code: ${response.responseCode}`);

        // Analyze important headers
        const importantHeaders = [
            "content-type",
            "content-length",
            "last-modified",
            "etag",
            "cache-control",
            "server",
            "date",
            "connection"
        ];

        Chat.log("\n📋 Important Headers:");
        for (const headerName of importantHeaders) {
            const values = response.headers.get(headerName);
            if (values && values.length > 0) {
                Chat.log(`${headerName}: ${values.join(", ")}`);
            } else {
                Chat.log(`${headerName}: (not present)`);
            }
        }

        Chat.log("\n📊 Header Statistics:");
        Chat.log(`Total header count: ${response.headers.size()}`);

        // Count headers with multiple values
        let multiValueHeaders = 0;
        for (const [key, values] of response.headers.entrySet()) {
            if (values.length > 1) {
                multiValueHeaders++;
                Chat.log(`Multi-value header: ${key} (${values.length} values)`);
            }
        }

        Chat.log(`Headers with multiple values: ${multiValueHeaders}`);

        // Show all headers (optional - can be verbose)
        if (response.headers.size() <= 20) {
            Chat.log("\n📝 All Headers:");
            for (const [key, values] of response.headers.entrySet()) {
                for (const value of values) {
                    Chat.log(`${key}: ${value}`);
                }
            }
        } else {
            Chat.log(`\n📝 Too many headers to display (${response.headers.size()})`);
        }

        // Extract server information
        const serverHeader = response.headers.get("server");
        if (serverHeader && serverHeader.length > 0) {
            Chat.log(`\n🖥️ Server: ${serverHeader[0]}`);
        }

        // Check caching information
        const cacheControl = response.headers.get("cache-control");
        const etag = response.headers.get("etag");
        const lastModified = response.headers.get("last-modified");

        if (cacheControl || etag || lastModified) {
            Chat.log("\n💾 Caching Information:");
            if (cacheControl) Chat.log(`Cache-Control: ${cacheControl.join(", ")}`);
            if (etag) Chat.log(`ETag: ${etag[0]}`);
            if (lastModified) Chat.log(`Last-Modified: ${lastModified[0]}`);
        }

    } catch (e) {
        Chat.log(`❌ Header analysis failed: ${e.message}`);
    }
}

// Test with a public API
analyzeResponseHeaders("https://jsonplaceholder.typicode.com/posts/1");
```

### Example 4: Advanced JSON Response Processing
```javascript
function processJsonResponse(url) {
    try {
        Chat.log(`🔄 Processing JSON from: ${url}`);

        const request = new HTTPRequest(url)
            .addHeader("Accept", "application/json")
            .addHeader("User-Agent", "JsMacros-JSON-Processor/1.0");

        const response = request.get();

        if (response.responseCode !== 200) {
            Chat.log(`❌ Request failed with status: ${response.responseCode}`);
            return null;
        }

        // Check content type
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType[0].includes("application/json")) {
            Chat.log("⚠️ Response is not JSON");
            Chat.log(`Content-Type: ${contentType ? contentType[0] : "unknown"}`);
        }

        // Get and parse JSON
        const body = response.text();
        const startTime = Date.now();

        try {
            const jsonData = JSON.parse(body);
            const parseTime = Date.now() - startTime;

            Chat.log("✅ JSON parsed successfully");
            Chat.log(`⏱️ Parse time: ${parseTime}ms`);
            Chat.log(`📊 Data size: ${body.length} characters`);

            // Analyze JSON structure
            analyzeJsonStructure(jsonData);

            return jsonData;

        } catch (parseError) {
            Chat.log(`❌ JSON parsing failed: ${parseError.message}`);
            Chat.log(`Response preview: ${body.substring(0, 200)}...`);
            return null;
        }

    } catch (e) {
        Chat.log(`❌ JSON processing failed: ${e.message}`);
        return null;
    }
}

function analyzeJsonStructure(data, depth = 0, maxDepth = 3) {
    const indent = "  ".repeat(depth);

    if (depth >= maxDepth) {
        Chat.log(`${indent}... (max depth reached)`);
        return;
    }

    if (data === null) {
        Chat.log(`${indent}null`);
    } else if (Array.isArray(data)) {
        Chat.log(`${indent}Array (${data.length} elements)`);

        if (data.length > 0) {
            const sampleSize = Math.min(3, data.length);
            Chat.log(`${indent}Sample elements (${sampleSize} of ${data.length}):`);

            for (let i = 0; i < sampleSize; i++) {
                Chat.log(`${indent}[${i}]:`);
                analyzeJsonStructure(data[i], depth + 1, maxDepth);
            }

            if (data.length > sampleSize) {
                Chat.log(`${indent}... and ${data.length - sampleSize} more elements`);
            }
        }
    } else if (typeof data === 'object') {
        const keys = Object.keys(data);
        Chat.log(`${indent}Object (${keys.length} properties):`);

        for (const key of keys.slice(0, 10)) { // Show first 10 properties
            Chat.log(`${indent}${key}:`);
            analyzeJsonStructure(data[key], depth + 1, maxDepth);
        }

        if (keys.length > 10) {
            Chat.log(`${indent}... and ${keys.length - 10} more properties`);
        }
    } else {
        const valueStr = String(data).substring(0, 50);
        Chat.log(`${indent}${typeof data}: ${valueStr}${String(data).length > 50 ? "..." : ""}`);
    }
}

// Test with a complex JSON API
processJsonResponse("https://jsonplaceholder.typicode.com/posts");
```

### Example 5: Response Comparison and Validation
```javascript
function compareResponses(urls) {
    const results = [];

    for (const url of urls) {
        try {
            Chat.log(`🔍 Analyzing: ${url}`);

            const request = new HTTPRequest(url)
                .addHeader("User-Agent", "JsMacros-Comparator/1.0");

            const startTime = Date.now();
            const response = request.get();
            const responseTime = Date.now() - startTime;

            const result = {
                url: url,
                status: response.responseCode,
                responseTime: responseTime,
                contentLength: response.text().length,
                headers: response.headers.size(),
                contentType: response.headers.get("content-type")?.[0] || "unknown"
            };

            results.push(result);

            Chat.log(`✅ ${url}`);
            Chat.log(`   Status: ${result.status}`);
            Chat.log(`   Time: ${result.responseTime}ms`);
            Chat.log(`   Size: ${result.contentLength} chars`);
            Chat.log(`   Type: ${result.contentType}`);

        } catch (e) {
            Chat.log(`❌ Failed to analyze ${url}: ${e.message}`);
            results.push({
                url: url,
                error: e.message
            });
        }
    }

    // Compare results
    Chat.log("\n📊 Comparison Results:");

    const successful = results.filter(r => !r.error);
    const failed = results.filter(r => r.error);

    Chat.log(`✅ Successful requests: ${successful.length}`);
    Chat.log(`❌ Failed requests: ${failed.length}`);

    if (successful.length > 0) {
        const avgTime = successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length;
        const avgSize = successful.reduce((sum, r) => sum + r.contentLength, 0) / successful.length;

        Chat.log(`📈 Average response time: ${avgTime.toFixed(0)}ms`);
        Chat.log(`📈 Average content size: ${Math.round(avgSize)} chars`);

        // Find fastest and slowest
        const fastest = successful.reduce((min, r) => r.responseTime < min.responseTime ? r : min);
        const slowest = successful.reduce((max, r) => r.responseTime > max.responseTime ? r : max);

        Chat.log(`🏆 Fastest: ${fastest.url} (${fastest.responseTime}ms)`);
        Chat.log(`🐌 Slowest: ${slowest.url} (${slowest.responseTime}ms)`);
    }

    return results;
}

// Compare multiple endpoints
const testUrls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/comments/1"
];

compareResponses(testUrls);
```

## Important Notes

### Response Handling

1. **Status Codes:** Always check response codes before processing response data
2. **Content Types:** Verify content-type headers before processing specific formats
3. **Error Handling:** Wrap response processing in try-catch blocks
4. **Memory Usage:** Large responses can consume significant memory

### Performance Considerations

1. **Caching:** The `text()` method caches results for efficiency
2. **Binary Data:** Use `byteArray()` for file downloads and binary content
3. **Header Access:** Headers are loaded once and stored in memory
4. **Timeouts:** Set appropriate timeouts to prevent hanging requests

### Data Formats

1. **JSON:** Parse manually using `JSON.parse()` for better error handling
2. **Binary:** Use `byteArray()` for non-text data
3. **Text:** Use `text()` for all text-based responses
4. **Encoding:** All text responses are decoded as UTF-8

## Best Practices

1. **Status Code Validation:** Always check response codes before processing
2. **Content Type Verification:** Verify expected content types before parsing
3. **Error Handling:** Implement comprehensive error handling for network issues
4. **Memory Management:** Process large responses in chunks when possible
5. **Timeout Configuration:** Set appropriate timeouts for your use case
6. **Header Analysis:** Use headers for caching, authentication, and content information

## Related Classes

- [`HTTPRequest`](HTTPRequest.md) - Parent class for making HTTP requests
- `Map` - Used for storing response headers
- `InputStream` - Used for streaming response data
- `HttpURLConnection` - Underlying Java HTTP connection class

## Version History

- **1.1.8:** Initial introduction with basic response handling
- **1.2.2:** Added `byteArray()` method for binary response handling
- **1.8.4:** Enhanced error handling and response processing
- **Current:** Improved performance with response body caching