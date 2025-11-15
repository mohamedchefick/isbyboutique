<template>
    <div class="cart-page max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Votre Panier</h1>
  
      <div v-if="cartStore.cart.length === 0" class="text-gray-500 text-center">
        Votre panier est vide.
      </div>
  
      <div v-else>
        <div v-for="item in cartStore.cart" :key="item.id" class="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow">
          <img v-if="item.image" :src="item.image" alt="image produit" class="w-24 h-24 object-cover rounded-lg" />
  
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-green-700">{{ item.name }}</h2>
            <p class="text-gray-700">Prix: {{ item.price }} €</p>
            <p class="text-gray-700">Quantité: {{ item.quantity }}</p>
            <p class="text-gray-700">Date: {{ formatDate(item.createdAt) }}</p>
          </div>
        </div>
  
        <div class="text-right mt-6">
          <p class="text-lg font-bold">Total : {{ cartStore.totalPrice }} €</p>
          <p class="text-gray-500">Articles : {{ cartStore.totalItems }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cart'
  
  const cartStore = useCartStore()
  
  // Fonction pour afficher la date correctement
  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return ''
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }
  </script>
  
  <style scoped>
  .cart-page {
    background-color: #f4f4f4;
    border-radius: 16px;
  }
  </style>
  