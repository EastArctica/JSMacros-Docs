import fs from 'fs/promises'
import path from 'path'

const JSON_DOCS_DIR = path.resolve('../../packages/doc-gen/json_docs-gemini-3-pro-preview')
const OUTPUT_DIR = path.resolve('./docs')

async function processJsonFile(jsonPath, outputPath) {
  try {
    const content = await fs.readFile(jsonPath, 'utf-8')
    const doc = JSON.parse(content)
    
    let md = `# ${doc.name}\n\n`
    
    // Metadata section
    if (doc.fullClassName || doc.extends || doc.since) {
      if (doc.fullClassName) {
        md += `**Full Class Name:** \`${doc.fullClassName}\`\n\n`
      }
      if (doc.extends) {
        md += `**Extends:** \`${doc.extends}\`\n\n`
      }
      if (doc.since) {
        md += `**Since:** ${doc.since}\n\n`
      }
    }
    
    // Description
    if (doc.description) {
      md += `${doc.description}\n\n`
    }
    
    // Overview
    if (doc.overview) {
      md += `## Overview\n\n${doc.overview}\n\n`
    }
    
    // Constructors
    if (doc.constructors && doc.constructors.length > 0) {
      md += `## Constructors\n\n`
      for (const constructor of doc.constructors) {
        md += `### \`${constructor.signature}\`\n\n`
        if (constructor.description) {
          md += `${constructor.description}\n\n`
        }
        
        if (constructor.parameters && constructor.parameters.length > 0) {
          md += `**Parameters:**\n\n`
          md += `| Parameter | Type | Description |\n`
          md += `| :--- | :--- | :--- |\n`
          for (const param of constructor.parameters) {
            md += `| \`${param.name}\` | \`${param.type}\` | ${param.description || ''} |\n`
          }
          md += `\n`
        }
        
        if (constructor.examples && constructor.examples.length > 0) {
          md += `**Examples:**\n\n`
          for (const example of constructor.examples) {
            md += `\`\`\`javascript\n${example}\n\`\`\`\n\n`
          }
        }
      }
    }
    
    // Methods
    if (doc.methods && doc.methods.length > 0) {
      md += `## Methods\n\n`
      for (const method of doc.methods) {
        md += `### \`${method.name}\`\n\n`
        
        if (method.static) {
          md += `::: info\nThis method is static.\n:::\n\n`
        }
        
        if (method.signature) {
          md += `**Signature:** \`${method.signature}\`\n\n`
        }
        if (method.returnType) {
          md += `**Returns:** \`${method.returnType}\`\n\n`
        }
        if (method.description) {
          md += `${method.description}\n\n`
        }
        
        if (method.parameters && method.parameters.length > 0) {
          md += `**Parameters:**\n\n`
          md += `| Parameter | Type | Description |\n`
          md += `| :--- | :--- | :--- |\n`
          for (const param of method.parameters) {
            md += `| \`${param.name}\` | \`${param.type}\` | ${param.description || ''} |\n`
          }
          md += `\n`
        }
        
        if (method.examples && method.examples.length > 0) {
          md += `**Examples:**\n\n`
          for (const example of method.examples) {
            md += `\`\`\`javascript\n${example}\n\`\`\`\n\n`
          }
        }
        
        md += `---\n\n`
      }
    }
    
    // Fields
    if (doc.fields && doc.fields.length > 0) {
      md += `## Fields\n\n`
      for (const field of doc.fields) {
        md += `### \`${field.name}\`\n\n`
        
        if (field.type) {
          md += `**Type:** \`${field.type}\`\n\n`
        }
        if (field.description) {
          md += `${field.description}\n\n`
        }
        
        md += `---\n\n`
      }
    }
    
    // Properties (for events)
    if (doc.properties && doc.properties.length > 0) {
      md += `## Properties\n\n`
      md += `| Property | Type | Description |\n`
      md += `| :--- | :--- | :--- |\n`
      for (const prop of doc.properties) {
        md += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.description || ''} |\n`
      }
      md += `\n`
    }
    
    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, md, 'utf-8')
    
  } catch (error) {
    console.error(`Error processing ${jsonPath}:`, error.message)
  }
}

async function walkDir(dir, baseDir, outputBase) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      await walkDir(fullPath, baseDir, outputBase)
    } else if (entry.name.endsWith('.json')) {
      const relativePath = path.relative(baseDir, fullPath)
      const outputPath = path.join(outputBase, relativePath.replace('.json', '.md'))
      await processJsonFile(fullPath, outputPath)
      console.log(`Generated: ${relativePath.replace('.json', '.md')}`)
    }
  }
}

async function main() {
  console.log('Building documentation from JSON files...\n')
  
  // Clean output directory
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true })
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  
  // Create index page
  const indexContent = `# JsMacros Documentation

Welcome to the complete API documentation for JsMacros - a Minecraft mod that allows you to write JavaScript macros to automate and enhance your gameplay.

## Getting Started

Use the sidebar to navigate through:

- **APIs**: Core global APIs available in scripts
- **Classes**: Helper classes and utilities
- **Events**: Available events and their properties

## Quick Links

- [World API](/apis/World) - Interact with the Minecraft world
- [Player API](/apis/Player) - Control the player
- [Chat API](/apis/Chat) - Send and receive chat messages
- [Hud API](/apis/Hud) - Manipulate the HUD

## Resources

- [GitHub Repository](https://github.com/JsMacros/JsMacros)
- [Discord Community](https://discord.gg/jsmacros)
`
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.md'), indexContent)
  
  // Process all JSON files
  await walkDir(JSON_DOCS_DIR, JSON_DOCS_DIR, OUTPUT_DIR)
  
  console.log('\n✓ Documentation build complete!')
}

main().catch(console.error)
