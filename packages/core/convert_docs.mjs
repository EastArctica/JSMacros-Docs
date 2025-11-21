import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const modelName = process.env.MODEL_NAME || 'gemini-2.0-flash-thinking-exp-01-21';

let writeQueue = Promise.resolve();
async function safeAppendFile(filePath, data) {
  const currentPromise = writeQueue;
  let resolve;
  const nextPromise = new Promise(r => resolve = r);
  writeQueue = nextPromise;
  await currentPromise;
  try {
    await fs.appendFile(filePath, data);
  } finally {
    resolve();
  }
}

async function processFile(filePath, outputDir) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const relativePath = path.relative('./docs', filePath);
    const outputPath = path.join(outputDir, relativePath.replace(/\.md$/, '.json'));

    // Skip if already exists (optional, for resuming)
    try {
      await fs.access(outputPath);
      console.log(`Skipping ${relativePath}, already exists.`);
      return;
    } catch {}

    console.log(`Processing ${relativePath}...`);

    const startTime = Date.now();
    
    // Use Google Generative AI SDK
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const result = await model.generateContent(`Extract the documentation for the class defined in this markdown file into a structured JSON format.

The JSON should follow this schema:
- name: Simple class name (e.g., Inventory)
- fullClassName: Fully qualified class name
- extends: Parent class if any (optional)
- since: Version since this class was available (optional)
- description: Short description of the class
- overview: Detailed overview text (optional)
- constructors: Array of constructors, each with:
  - signature: Constructor signature
  - description: Description of the constructor
  - parameters: Array of parameters (name, type, description)
- methods: Array of methods, each with:
  - name: Name of the method
  - signature: Full signature of the method
  - returnType: Return type of the method
  - description: Description of what the method does
  - parameters: Array of parameters (name, type, description)
  - static: Whether the method is static (boolean)
  - deprecated: Whether the method is deprecated (boolean)
  - examples: Code examples for this method (array of strings)

Markdown Content:
${content}

Return ONLY valid JSON matching the schema above.`);
    
    const duration = Date.now() - startTime;
    const response = result.response;
    
    // Parse the JSON response
    let responseContent = response.text();
    // Remove ```json and ``` markers if present
    responseContent = responseContent.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/i, '');
    const object = JSON.parse(responseContent);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(object, null, 2));
    console.log(`Saved to ${outputPath}`);

    // Log costs - Google AI provides usage metadata
    const usageMetadata = response.usageMetadata || {};
    
    // TODO: Not accurate for tokens above 200k

    // Calculate cost based on Google's pricing
    // Gemini 2.0 Flash Thinking: $0.00001875 per 1K input tokens, $0.000075 per 1K output tokens
    // const inputCostPer1k = 0.00001875;
    // const outputCostPer1k = 0.000075;

    // Gemini 3.0 Pro Preview: $0.002 per 1K input tokens, $0.012 per 1K output tokens
    const inputCostPer1k = 0.002;
    const outputCostPer1k = 0.012;
    
    const promptTokens = usageMetadata.promptTokenCount || 0;
    const candidatesTokens = usageMetadata.candidatesTokenCount || 0;
    const totalTokens = usageMetadata.totalTokenCount || 0;
    
    // For thinking models, Google provides thinking tokens separately
    const thinkingTokens = usageMetadata.cachedContentTokenCount || 0;
    
    const cost = (promptTokens / 1000 * inputCostPer1k) + (candidatesTokens / 1000 * outputCostPer1k);
    
    let costEntry = {
      cost: parseFloat(cost.toFixed(8)),
      tokens_prompt: promptTokens,
      tokens_completion: candidatesTokens,
      generation_time: duration,
      native_tokens_prompt: promptTokens,
      native_tokens_completion: candidatesTokens - thinkingTokens,
      native_tokens_reasoning: thinkingTokens,
      model: modelName
    };

    const logLine = `${relativePath.replace(/\.md$/, '.json')}: ${JSON.stringify(costEntry)}\n`;
    await safeAppendFile('costs.txt', logLine);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function getAllFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      results = results.concat(await getAllFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

function getThreadCount() {
  const args = process.argv.slice(2);
  const threadIndex = args.indexOf('--threads');
  if (threadIndex !== -1 && args[threadIndex + 1]) {
    const val = parseInt(args[threadIndex + 1], 10);
    if (!isNaN(val) && val > 0) return val;
  }
  return 1;
}

async function main() {
  const inputDir = path.resolve('./docs');
  const outputDir = path.resolve('./json_docs');
  const concurrency = getThreadCount();

  console.log(`Starting conversion from ${inputDir} to ${outputDir} using model ${modelName}`);
  console.log(`Concurrency set to ${concurrency} threads.`);

  const files = await getAllFiles(inputDir);
  console.log(`Found ${files.length} files to process.`);

  const queue = [...files];
  const workers = [];

  for (let i = 0; i < Math.min(concurrency, files.length); i++) {
    workers.push((async () => {
      while (queue.length > 0) {
        const filePath = queue.shift();
        await processFile(filePath, outputDir);
      }
    })());
  }

  await Promise.all(workers);

  console.log('Conversion complete!');
}

main();
