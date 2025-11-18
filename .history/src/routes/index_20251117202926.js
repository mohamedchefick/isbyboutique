import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/composents/Home/HomePage.vue';
import CartPage from '../pages/panier/CartPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage.vue';

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
  },
  {
    path: '/produit/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;