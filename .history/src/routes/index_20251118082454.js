import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/composents/Home/HomePage.vue';
import CartPage from '../pages/panier/CartPage.vue';
import ProductDetailsPage from '../pages/ProductDetailsPage.vue';
import OrderPage from '../pages/OrderPage.vue';

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
  },
  {
    path: '/order',
    name: 'OrderPage',
    component: OrderPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;