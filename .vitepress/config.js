import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'civilization-os',
  description: 'Server operations runtime for AI agents',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ssh-mcp', link: '/docs/ssh-mcp' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/civilization-os' },
    ],
  },
})
