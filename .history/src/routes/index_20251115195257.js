import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '../pages/panier/CartPage.vue';

const routes = [
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
