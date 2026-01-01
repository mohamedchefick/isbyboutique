<template>
    <div>
      <!-- HEADER PANIER -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div class="flex items-center justify-between">
            <button @click="goBack" class="text-[#da9a90] hover:text-[#c88980] font-semibold flex items-center gap-2 transition-colors group">
              <div class="h-10 text-2xl text-[#da9a90]">←</div>
              <span class="hidden sm:inline">Continuer mes achats</span>
            </button>
            <div class="flex items-center gap-3 sm:gap-4">
              <div class="bg-[#da9a90]/10 p-2 sm:p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-[#da9a90]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Mon Panier</h1>
                <p class="text-xs sm:text-sm text-gray-500 mt-0.5" v-if="cartStore.cart.length > 0">
                  {{ totalItems }} article{{ totalItems > 1 ? 's' : '' }} dans votre panier
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- FORMULAIRE CLIENT -->
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-32">
        <h2 class="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Informations du client</h2>
  
        <div class="bg-white shadow-md rounded-xl p-6 space-y-5 border border-gray-100">
  
          <div>
            <label class="block font-medium text-gray-700 mb-1">Nom</label>
            <input v-model="form.nom" type="text" placeholder="Doe"
                   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
          </div>
  
          <div>
            <label class="block font-medium text-gray-700 mb-1">Prénom</label>
            <input v-model="form.prenom" type="text" placeholder="John"
                   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
          </div>
  
          <div>
            <label class="block font-medium text-gray-700 mb-1">Numéro WhatsApp</label>
            <input v-model="form.whatsapp" type="tel" placeholder="+229 90 00 00 00"
                   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
          </div>
  
          <div>
            <label class="block font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="john.doe@example.com"
                   class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
          </div>
  
          <button @click="saveClientInfo"
                  class="w-full bg-[#da9a90] text-white font-semibold py-3 rounded-lg hover:bg-[#c88980] transition">
            Enregistrer mes informations
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const cartStore = useCartStore();
  const router = useRouter();
  const toast = useToast();
  
  const totalItems = computed(() =>
      cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0)
  );
  
  const form = ref({
    nom: '',
    prenom: '',
    whatsapp: '',
    email: ''
  });
  
  // Fonction pour envoyer les infos au backend et envoyer l'email via Brevo
  async function saveClientInfo() {
    if (!form.value.nom || !form.value.prenom || !form.value.email) {
      toast.error("Veuillez remplir au moins le nom, prénom et email.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form.value,
          cartItems: cartStore.cart, // Use cartItems to match backend expectation
          totalPrice: cartStore.totalPrice
        })
      });
  
      if (!response.ok) throw new Error("Erreur serveur");
  
      toast.success("Informations enregistrées et email envoyé !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'envoi de l'email.");
    }
  }
  
  // Retour à la page d'accueil
  function goBack() {
    router.push('/');
  }
  </script>
  