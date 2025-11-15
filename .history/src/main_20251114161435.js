import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.cjs'

const app = createApp(App)
app.use(createPinia())
app.use(Toast, { position: 'top-right', timeout: 2000 })
app.mount('#app')


createApp(App).mount('#app')
