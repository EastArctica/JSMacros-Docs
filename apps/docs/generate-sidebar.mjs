import fs from 'fs'
import path from 'path'

const DOCS_DIR = path.resolve('./docs')

function formatCategoryName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getAllMarkdownFiles(dir, baseDir = '') {
  const files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = baseDir ? path.join(baseDir, item.name) : item.name
    
    if (item.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, relativePath))
    } else if (item.name.endsWith('.md') && item.name !== 'index.md') {
      files.push({
        name: item.name.replace('.md', ''),
        path: relativePath.replace(/\\/g, '/')
      })
    }
  }
  
  return files
}

function generateSidebar() {
  const sidebar = {}
  
  // APIs
  const apisPath = path.join(DOCS_DIR, 'apis')
  if (fs.existsSync(apisPath)) {
    const apiFiles = getAllMarkdownFiles(apisPath)
      .map(f => ({
        text: f.name,
        link: `/apis/${f.name}`
      }))
      .sort((a, b) => a.text.localeCompare(b.text))
    
    sidebar['/apis/'] = [{
      text: 'APIs',
      items: apiFiles
    }]
  }
  
  // Classes
  const classesPath = path.join(DOCS_DIR, 'classes')
  if (fs.existsSync(classesPath)) {
    const categories = fs.readdirSync(classesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort()
    
    const classItems = []
    
    for (const category of categories) {
      const categoryPath = path.join(classesPath, category)
      const categoryFiles = getAllMarkdownFiles(categoryPath, category)
        .map(f => ({
          text: f.name,
          link: `/classes/${f.path.replace('.md', '')}`
        }))
        .sort((a, b) => a.text.localeCompare(b.text))
      
      if (categoryFiles.length > 0) {
        classItems.push({
          text: formatCategoryName(category),
          collapsed: true,
          items: categoryFiles
        })
      }
    }
    
    sidebar['/classes/'] = [{
      text: 'Classes',
      items: classItems
    }]
  }
  
  // Events
  const eventsPath = path.join(DOCS_DIR, 'events')
  if (fs.existsSync(eventsPath)) {
    const eventFiles = getAllMarkdownFiles(eventsPath)
      .map(f => ({
        text: f.name,
        link: `/events/${f.name}`
      }))
      .sort((a, b) => a.text.localeCompare(b.text))
    
    sidebar['/events/'] = [{
      text: 'Events',
      items: eventFiles
    }]
  }
  
  return sidebar
}

// Generate and write sidebar config to a JSON file
const sidebar = generateSidebar()
fs.writeFileSync('.vitepress/sidebar-config.json', JSON.stringify(sidebar, null, 2))
console.log('✓ Generated sidebar configuration with:')
console.log(`  - ${sidebar['/apis/'][0].items.length} APIs`)
console.log(`  - ${sidebar['/classes/'][0].items.reduce((sum, cat) => sum + cat.items.length, 0)} Classes in ${sidebar['/classes/'][0].items.length} categories`)
console.log(`  - ${sidebar['/events/'][0].items.length} Events`)

