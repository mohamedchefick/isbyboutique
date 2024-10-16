import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Articles from '../src/view/articles/index.vue'
// import CartPage from '@/views/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  }, 
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
  },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: CartPage,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
