import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Importe les composants que tu veux associer à tes routes
import Home from '../src/view/home/HomePage.vue'
import Articles from '../src/view/articles/index.vue'
import DetailsArticle from '../src/view/details/index.vue'

// Définis tes routes
const routes = [
  { path: '/', component: Home },
  { path: '/articles', component: Articles },
  { path: '/details', component: DetailsArticle },
]

// Crée une instance du routeur
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Crée l'application Vue
const app = createApp(App)

// Utilise le routeur dans l'application Vue
app.use(router)

// Monte l'application
app.mount('#app')
