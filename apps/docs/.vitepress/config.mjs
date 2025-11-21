import { defineConfig } from 'vitepress'
import sidebarConfig from './sidebar-config.json' with { type: 'json' }

export default defineConfig({
  title: 'JsMacros Documentation',
  description: 'Complete API documentation for the JsMacros Minecraft mod',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'APIs', link: '/apis/Client' },
      { text: 'Classes', link: '/classes/advanced-classes/BaseScriptContext$ScriptAssertionError.html' },
      { text: 'Events', link: '/events/' },
      { text: 'GitHub', link: 'https://github.com/EastArctica/JsMacros-Docs/tree/new' }
    ],
    
    sidebar: sidebarConfig,
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EastArctica/JsMacros-Docs/tree/new' }
    ],
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3]
    }
  },
  
  srcDir: './docs'
})
