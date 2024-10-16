import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductPage from '@/views/ProductPage.vue';
import CartPage from '@/views/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
