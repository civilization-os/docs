import { defineConfig } from 'vitepress'
import { createRequire } from 'module'

export default defineConfig({
  base: '/docs/',
  title: 'civilization-os',
  description: 'Wiki · Math · CS',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Math', link: '/math/calculus/' },
      { text: 'CS', link: '/cs/' },
      { text: 'Projects', link: '/projects/' },
    ],
    sidebar: {
      '/math/': [
        {
          text: '数学',
          items: [
            { text: '高等数学', link: '/math/calculus/' },
            { text: '线性代数', link: '/math/linear-algebra/' },
            { text: '概率论', link: '/math/probability/' },
          ],
        },
      ],
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
