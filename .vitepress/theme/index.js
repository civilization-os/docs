import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroTerminal from './HeroTerminal.vue'
import SortingVisualizer from './SortingVisualizer.vue'
import SortingDiagrams from './SortingDiagrams.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroTerminal', HeroTerminal)
    app.component('SortingVisualizer', SortingVisualizer)
    app.component('SortingDiagrams', SortingDiagrams)
  }
}

