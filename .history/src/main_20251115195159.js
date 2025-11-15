import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './routes/index.js';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(Toast, { position: 'top-right', timeout: 2000 }, router)

app.mount('#app')
