import { defineConfig } from 'vitepress'

const inlineCSS = `
.card-group { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin: 0 auto; }
.card { display: inline-block; padding: 16px 32px; border: 1px solid var(--vp-c-gutter); border-radius: 12px; text-decoration: none; min-width: 150px; text-align: center; transition: all 0.25s ease; background: var(--vp-c-bg-soft); }
.card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.dark .card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
.card-icon { font-size: 28px; margin-bottom: 4px; }
.card-title { font-size: 16px; color: var(--vp-c-text-1); }
.card-desc { font-size: 13px; color: var(--vp-c-text-3); }
.hero-wrap { max-width: 600px; margin: 0 auto; }
@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes showCursor { from { opacity: 0; } to { opacity: 1; } }
.hero-svg .cursor { opacity: 0; animation: blink 0.8s step-end infinite; }
.hero-svg .cursor-title { animation: showCursor 0.01s 1.12s both, blink 0.8s step-end infinite; }
.hero-svg .cursor-sub { animation: showCursor 0.01s 1.26s both, blink 0.8s step-end infinite; }
.hero-svg .fade { opacity: 0; animation: fadeIn 0.35s both; }
.hero-svg .float { animation: float 3s ease-in-out infinite; }
.hero-svg .hero-text { fill: var(--vp-c-text-1); }
.hero-svg .hero-sub { fill: var(--vp-c-text-2); }
.hero-svg .hero-meta { fill: var(--vp-c-text-3); }
.hero-svg .d1 { animation-delay: 0s; }
.hero-svg .d2 { animation-delay: 0.07s; }
.hero-svg .d3 { animation-delay: 0.14s; }
.hero-svg .d4 { animation-delay: 0.21s; }
.hero-svg .d5 { animation-delay: 0.28s; }
.hero-svg .d6 { animation-delay: 0.35s; }
.hero-svg .d7 { animation-delay: 0.42s; }
.hero-svg .d8 { animation-delay: 0.49s; }
.hero-svg .d9 { animation-delay: 0.56s; }
.hero-svg .d10 { animation-delay: 0.63s; }
.hero-svg .d11 { animation-delay: 0.70s; }
.hero-svg .d12 { animation-delay: 0.77s; }
.hero-svg .d13 { animation-delay: 0.84s; }
.hero-svg .d14 { animation-delay: 0.91s; }
.hero-svg .d15 { animation-delay: 0.98s; }
.hero-svg .d16 { animation-delay: 1.05s; }
.hero-svg .d17 { animation-delay: 1.12s; }
`

export default defineConfig({
  base: '/docs/',
  title: 'civilization-os',
  description: 'Wiki · Math · CS',
  head: [
    ['style', {}, inlineCSS]
  ],
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
