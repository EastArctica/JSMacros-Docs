import fs from 'fs/promises';
import path from 'path';

async function processFile(filePath, outputDir) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const doc = JSON.parse(content);
    const relativePath = path.relative('./json_docs', filePath);
    const outputPath = path.join(outputDir, relativePath.replace(/\.json$/, '.md'));

    console.log(`Generating ${relativePath.replace(/\.json$/, '.md')}...`);

    let md = `# ${doc.name}\n\n`;

    if (doc.fullClassName) {
      md += `**Full Class Name:** \`${doc.fullClassName}\`\n\n`;
    }
    if (doc.extends) {
      md += `**Extends:** \`${doc.extends}\`\n\n`;
    }
    if (doc.since) {
      md += `**Since:** ${doc.since}\n\n`;
    }

    if (doc.description) {
      md += `${doc.description}\n\n`;
    }

    if (doc.overview) {
      md += `## Overview\n\n${doc.overview}\n\n`;
    }

    if (doc.constructors && doc.constructors.length > 0) {
      md += `## Constructors\n\n`;
      for (const c of doc.constructors) {
        md += `### \`${c.signature}\`\n\n`;
        md += `${c.description}\n\n`;
        if (c.parameters && c.parameters.length > 0) {
          md += `**Parameters:**\n`;
          md += `| Parameter | Type | Description |\n`;
          md += `| :--- | :--- | :--- |\n`;
          for (const p of c.parameters) {
            md += `| \`${p.name}\` | \`${p.type}\` | ${p.description} |\n`;
          }
          md += `\n`;
        }
      }
    }

    if (doc.methods && doc.methods.length > 0) {
      md += `## Methods\n\n`;
      for (const m of doc.methods) {
        md += `### \`${m.name}\`\n\n`;
        if (m.static) {
            md += `> [!NOTE]\n> This method is static.\n\n`;
        }
        md += `**Signature:** \`${m.signature}\`\n\n`;
        md += `**Returns:** \`${m.returnType}\`\n\n`;
        md += `${m.description}\n\n`;

        if (m.parameters && m.parameters.length > 0) {
          md += `**Parameters:**\n`;
          md += `| Parameter | Type | Description |\n`;
          md += `| :--- | :--- | :--- |\n`;
          for (const p of m.parameters) {
            md += `| \`${p.name}\` | \`${p.type}\` | ${p.description} |\n`;
          }
          md += `\n`;
        }

        if (m.examples && m.examples.length > 0) {
          md += `**Examples:**\n`;
          for (const example of m.examples) {
            md += `\`\`\`javascript\n${example}\n\`\`\`\n\n`;
          }
        }
        md += `---\n\n`;
      }
    }

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, md);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function walkDir(dir, callback) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await walkDir(filePath, callback);
    } else if (file.endsWith('.json')) {
      await callback(filePath);
    }
  }
}

async function main() {
  const inputDir = path.resolve('./json_docs');
  const outputDir = path.resolve('./clean_docs');

  console.log(`Starting markdown generation from ${inputDir} to ${outputDir}`);

  await walkDir(inputDir, async (filePath) => {
    await processFile(filePath, outputDir);
  });

  console.log('Generation complete!');
}

main();
