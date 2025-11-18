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
          <input v-model="form.nom" type="text"
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1">Prénom</label>
          <input v-model="form.prenom" type="text"
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1">Numéro WhatsApp</label>
          <input v-model="form.whatsapp" type="tel" placeholder="+229 90 00 00 00"
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email"
                 class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-[#da9a90] focus:border-[#da9a90] outline-none">
        </div>

        <button @click="saveClientInfo"
                :disabled="isLoading"
                :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                class="w-full bg-[#da9a90] text-white font-semibold py-3 rounded-lg hover:bg-[#c88980] transition">
          {{ isLoading ? 'Envoi en cours...' : 'Enregistrer et envoyer la commande' }}
        </button>

        <!-- Message de succès/erreur -->
        <div v-if="message.text" 
             :class="message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'"
             class="p-4 rounded-lg border text-sm">
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
  <foote1 />
  <foote />
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

  // Calcule les totaux
  const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Prépare les données avec images - vérifier toutes les propriétés possibles
  const cartItemsWithImages = storedCart.map(item => {
    console.log("📦 Article:", item); // DEBUG - voir la structure de chaque article
    
    return {
      name: item.name || item.title || item.productName || 'Produit',
      quantity: item.quantity || 1,
      price: item.price || 0,
      // Vérifie plusieurs propriétés possibles pour l'image
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
    totalPrice
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

    // Réinitialiser le formulaire après succès
    setTimeout(() => {
      form.value = { nom: '', prenom: '', whatsapp: '', email: '' };
      // Optionnel : vider le panier
      // localStorage.removeItem("cartItems");
      // cartStore.clearCart();
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