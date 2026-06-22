import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'civilization-os',
  description: 'Server operations runtime for AI agents',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CS Wiki', link: '/cs/' },
      { text: 'Projects', link: '/projects/' },
    ],
    sidebar: {
      '/cs/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            { text: '算法与数据结构', link: '/cs/basics/algorithms/' },
            { text: '操作系统', link: '/cs/basics/os/' },
            { text: '计算机网络', link: '/cs/basics/network/' },
          ],
        },
        {
          text: '编程语言',
          collapsed: true,
          items: [],
        },
        {
          text: '框架',
          collapsed: true,
          items: [],
        },
        {
          text: '中间件',
          collapsed: true,
          items: [],
        },
        {
          text: '分布式理论',
          collapsed: true,
          items: [],
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
