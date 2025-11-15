<template>
    <div class="cart-page min-h-screen bg-gray-50 py-8 px-4">
        <div class="max-w-6xl mx-auto">
            <!-- En-tête -->
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Mon Panier</h1>
                <button @click="goBack" class="text-[#da9a90] hover:underline flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continuer mes achats
                </button>
            </div>

            <div v-if="cartStore.cart.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 class="text-2xl font-semibold text-gray-700 mb-2">Votre panier est vide</h2>
                <p class="text-gray-500 mb-6">Ajoutez des articles pour commencer vos achats</p>
                <button @click="goBack" class="bg-[#da9a90] text-white px-6 py-3 rounded-lg hover:bg-[#c88980] transition duration-200">
                    Découvrir nos produits
                </button>
            </div>

            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-4">
                    <div v-for="item in cartStore.cart" :key="item.id" class="bg-white rounded-lg shadow-md p-4 flex gap-4">
                        <div class="w-32 h-32 flex-shrink-0">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-lg">
                        </div>

                        <div class="flex-grow">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ item.name }}</h3>
                            <p class="text-gray-600 text-sm mb-3" v-html="truncateDescription(item.description)"></p>
                            <div class="flex items-center gap-4">
                                <p class="text-xl font-bold text-[#da9a90]">{{ item.price }} €</p>
                            </div>
                        </div>

                        <div class="flex flex-col items-end justify-between">
                            <button @click="removeItem(item.id)" class="text-red-500 hover:text-red-700 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <div class="flex items-center gap-2 border border-gray-300 rounded-lg">
                                <button @click="decrementQuantity(item)" class="px-3 py-1 hover:bg-gray-100 transition">-</button>
                                <span class="px-3 py-1 font-semibold">{{ item.quantity || 1 }}</span>
                                <button @click="incrementQuantity(item)" class="px-3 py-1 hover:bg-gray-100 transition">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Résumé de la commande</h2>
                        
                        <div class="space-y-3 mb-4">
                            <div class="flex justify-between text-gray-600">
                                <span>Sous-total ({{ totalItems }} articles)</span>
                                <span>{{ subtotal.toFixed(2) }} €</span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>Livraison</span>
                                <span>{{ shipping.toFixed(2) }} €</span>
                            </div>
                            <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span>{{ total.toFixed(2) }} €</span>
                            </div>
                        </div>

                        <button @click="checkout" class="w-full bg-[#da9a90] text-white py-3 rounded-lg hover:bg-[#c88980] transition duration-200 font-semibold mb-3">
                            Passer la commande
                        </button>

                        <button @click="clearCart" class="w-full border-2 border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-white transition duration-200 font-semibold">
                            Vider le panier
                        </button>

                        <div class="mt-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Code promo</label>
                            <div class="flex gap-2">
                                <input v-model="promoCode" type="text" placeholder="Entrez votre code" class="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da9a90]">
                                <button @click="applyPromo" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                                    Appliquer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const toast = useToast();
const router = useRouter();
const promoCode = ref('');

// Calculer le nombre total d'articles
const totalItems = computed(() => {
    return cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0);
});

// Calculer le sous-total
const subtotal = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = item.quantity || 1;
        return total + (price * quantity);
    }, 0);
});

// Frais de livraison
const shipping = computed(() => {
    return subtotal.value > 50 ? 0 : 5.99;
});

// Total
const total = computed(() => {
    return subtotal.value + shipping.value;
});

// Tronquer la description
const truncateDescription = (description) => {
    const text = description.replace(/<[^>]*>/g, '');
    return text.length > 60 ? text.substring(0, 60) + '...' : text;
};

// Retirer un article
const removeItem = (id) => {
    cartStore.removeFromCart(id);
    toast.info('Article retiré du panier');
};

// Vider le panier
const clearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        cartStore.clearCart();
        toast.success('Panier vidé avec succès');
    }
};

// Incrémenter la quantité
const incrementQuantity = (item) => {
    item.quantity = (item.quantity || 1) + 1;
    toast.success('Quantité mise à jour');
};

// Décrémenter la quantité
const decrementQuantity = (item) => {
    if ((item.quantity || 1) > 1) {
        item.quantity = (item.quantity || 1) - 1;
        toast.success('Quantité mise à jour');
    } else {
        removeItem(item.id);
    }
};

// Appliquer le code promo
const applyPromo = () => {
    if (promoCode.value.trim()) {
        toast.info('Fonctionnalité de code promo en développement');
        promoCode.value = '';
    }
};

// Passer la commande
const checkout = () => {
    toast.success('Redirection vers le paiement...');
    // Ici vous pouvez rediriger vers une page de checkout
    // router.push('/checkout');
};

// Retour aux achats
const goBack = () => {
    router.back();
};
</script>

<style scoped>
.cart-page {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

button {
    transition: all 0.2s ease;
}

button:active {
    transform: scale(0.98);
}
</style>