import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CartPage from '../pages/panier/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/panier',
    name: 'Cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;