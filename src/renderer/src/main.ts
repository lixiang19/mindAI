import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './route'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'
import TDesign from 'tdesign-vue-next'
// import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(PrimeVue, { ripple: true, inputStyle: 'filled' })
app.use(TDesign)
app.mount('#app')
app.directive('tooltip', Tooltip)

// 设置font-size
// const setHtmlFontSize = () => {
//   const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
//   const htmlDom = document.getElementsByTagName('html')[0]
//   htmlDom.style.fontSize = htmlWidth / 100 + 'px'
// }
// setHtmlFontSize()
