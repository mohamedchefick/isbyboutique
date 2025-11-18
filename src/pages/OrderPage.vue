<template>
  <div class="min-h-screen bg-gray-50">
    <!-- HEADER PANIER -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div class="flex items-center justify-between gap-4">
          <!-- Bouton retour -->
          <button
            @click="goBack"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[#da9a90]/30 bg-[#da9a90]/5 text-[#da9a90] hover:bg-[#da9a90]/10 hover:border-[#da9a90]/60 font-semibold transition-colors"
          >
            <span class="text-lg">←</span>
            <span class="hidden sm:inline text-sm">Continuer mes achats</span>
          </button>

          <!-- Titre + résumé panier -->
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="bg-[#da9a90]/10 p-2.5 sm:p-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8 text-[#da9a90]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                Mon Panier
              </h1>
              <p
                v-if="cartStore.cart.length > 0"
                class="text-xs sm:text-sm text-gray-500 mt-1"
              >
                {{ totalItems }} article{{ totalItems > 1 ? 's' : '' }} dans votre panier
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FORMULAIRE CLIENT -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-24">
      <!-- Titre section -->
      <div class="flex items-start justify-between mb-5">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#da9a90]/10 text-[#da9a90]">
              <!-- Icône utilisateur -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A9 9 0 1118.364 4.56 9 9 0 015.12 17.804z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            Informations du client
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Ces informations nous permettent de vous confirmer la commande et de vous contacter si besoin.
          </p>
        </div>
      </div>

      <div class="bg-white shadow-sm sm:shadow-md rounded-2xl p-5 sm:p-7 border border-gray-100 space-y-6">
        <!-- Nom & prénom -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Nom
            </label>
            <input
              v-model="form.nom"
              type="text"
              placeholder="Dupont"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm sm:text-base
                     focus:ring-2 focus:ring-[#da9a90]/50 focus:border-[#da9a90] outline-none
                     placeholder:text-gray-400 bg-gray-50/60 hover:bg-white transition-colors"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Prénom
            </label>
            <input
              v-model="form.prenom"
              type="text"
              placeholder="Marie"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm sm:text-base
                     focus:ring-2 focus:ring-[#da9a90]/50 focus:border-[#da9a90] outline-none
                     placeholder:text-gray-400 bg-gray-50/60 hover:bg-white transition-colors"
            >
          </div>
        </div>

        <!-- Coordonnées -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Numéro WhatsApp
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
                📱
              </span>
              <input
                v-model="form.whatsapp"
                type="tel"
                placeholder="+229 90 00 00 00"
                class="w-full border border-gray-300 rounded-xl pl-9 pr-4 py-2.5 text-sm sm:text-base
                       focus:ring-2 focus:ring-[#da9a90]/50 focus:border-[#da9a90] outline-none
                       placeholder:text-gray-400 bg-gray-50/60 hover:bg-white transition-colors"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
                ✉️
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="vous@example.com"
                class="w-full border border-gray-300 rounded-xl pl-9 pr-4 py-2.5 text-sm sm:text-base
                       focus:ring-2 focus:ring-[#da9a90]/50 focus:border-[#da9a90] outline-none
                       placeholder:text-gray-400 bg-gray-50/60 hover:bg-white transition-colors"
              >
            </div>
          </div>
        </div>

        <!-- Bouton d'envoi -->
        <div class="pt-2">
          <button
            @click="saveClientInfo"
            :disabled="isLoading"
            class="w-full inline-flex items-center justify-center gap-2 bg-[#da9a90] text-white font-semibold py-3 rounded-xl
                   hover:bg-[#c88980] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#da9a90]
                   disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            <svg
              v-if="isLoading"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>
              {{ isLoading ? 'Envoi en cours...' : 'Enregistrer et envoyer la commande' }}
            </span>
          </button>
          <p class="mt-2 text-xs text-gray-400 text-center">
            En cliquant, vous acceptez d’être contacté(e) pour la confirmation de votre commande.
          </p>
        </div>

        <!-- Message de succès/erreur -->
        <transition name="fade">
          <div
            v-if="message.text"
            :class="message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-red-50 text-red-800 border-red-200'"
            class="flex items-start gap-2 p-3 sm:p-4 rounded-xl border text-sm"
          >
            <div class="mt-0.5">
              <svg
                v-if="message.type === 'success'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 13l4 4L19 7" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p>{{ message.text }}</p>
          </div>
        </transition>
      </div>
    </section>

    <foote1 />
    <foote />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import foote1 from '@/components/helper/footer1.vue';
import foote from '@/components/helper/footer.vue';

const cartStore = useCartStore();
const router = useRouter();
const isLoading = ref(false);
const message = ref({ text: '', type: '' });

const totalItems = computed(() =>
    cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0)
);

const form = ref({
  nom: '',
  prenom: '',
  whatsapp: '',
  email: ''
});

async function saveClientInfo() {
  // Reset message
  message.value = { text: '', type: '' };

  // Validation
  if (!form.value.nom || !form.value.prenom || !form.value.email) {
    message.value = { 
      text: "Veuillez remplir au moins le nom, prénom et email.", 
      type: 'error' 
    };
    return;
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    message.value = { 
      text: "Veuillez entrer une adresse email valide.", 
      type: 'error' 
    };
    return;
  }

  // Récupère le panier depuis cartStore OU localStorage
  let storedCart = cartStore.cart && cartStore.cart.length > 0 
    ? cartStore.cart 
    : JSON.parse(localStorage.getItem("cartItems") || "[]");
  
  // Si toujours vide, essayer d'autres clés possibles
  if (storedCart.length === 0) {
    storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  }
  
  console.log("🛒 Panier récupéré:", storedCart); // DEBUG
  console.log("📊 CartStore:", cartStore.cart); // DEBUG
  
  if (storedCart.length === 0) {
    message.value = { 
      text: "Votre panier est vide.", 
      type: 'error' 
    };
    return;
  }

  const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartItemsWithImages = storedCart.map(item => {
    console.log("📦 Article:", item); // DEBUG - voir la structure de chaque article
    
    return {
      name: item.name || item.title || item.productName || 'Produit',
      quantity: item.quantity || 1,
      price: item.price || 0,
      image: item.image || item.img || item.imageUrl || item.thumbnail || item.photo || 'https://via.placeholder.com/80'
    };
  });
  
  console.log("📧 Données envoyées au backend:", cartItemsWithImages); // DEBUG

  const payload = {
    nom: form.value.nom,
    prenom: form.value.prenom,
    email: form.value.email,
    whatsapp: form.value.whatsapp,
    cartItems: cartItemsWithImages,
    totalItems,
    totalPrice,
    
  };

  isLoading.value = true;

  try {
    const response = await fetch("http://localhost:3001/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur serveur");
    }

    message.value = { 
      text: "✅ Commande envoyée avec succès ! Vérifiez votre email.", 
      type: 'success' 
    };

    setTimeout(() => {
      form.value = { nom: '', prenom: '', whatsapp: '', email: '' };
    }, 2000);

  } catch (error) {
    console.error(error);
    message.value = { 
      text: `❌ Erreur lors de l'envoi : ${error.message}`, 
      type: 'error' 
    };
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push('/');
}
</script>