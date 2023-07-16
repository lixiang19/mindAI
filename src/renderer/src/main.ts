import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './route'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.directive('tooltip', Tooltip)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(PrimeVue, { ripple: true, inputStyle: 'filled' })
app.mount('#app')
