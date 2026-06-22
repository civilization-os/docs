import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'civilization-os',
  description: 'Server operations runtime for AI agents',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Projects', link: '/projects/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
      ],
      '/projects/': [
        {
          text: 'Projects',
          items: [
            { text: 'Overview', link: '/projects/' },
            { text: 'ssh-mcp', link: '/projects/ssh-mcp' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/civilization-os' },
    ],
    footer: {
      message: 'Built with ❤️',
    },
  },
})
