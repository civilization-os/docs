import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroTerminal from './HeroTerminal.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroTerminal', HeroTerminal)
  }
}

