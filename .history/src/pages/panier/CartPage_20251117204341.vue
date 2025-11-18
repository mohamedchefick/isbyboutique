<template>
    <div class="cart-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <!-- En-tête moderne -->
        <div class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div class="flex items-center justify-between">
                    <button @click="goBack" class="text-[#da9a90] hover:text-[#c88980] font-semibold flex items-center gap-2 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span class="hidden sm:inline">Continuer mes achats</span>
                    </button>
                    <!--  -->
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

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <!-- Panier vide -->
            <div v-if="cartStore.cart.length === 0" class="bg-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 text-center">
                <div class="max-w-md mx-auto">
                    <div class="bg-gray-100 rounded-full w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Votre panier est vide</h2>
                    <p class="text-gray-600 text-base sm:text-lg mb-8">Découvrez notre sélection de produits et commencez vos achats</p>
                    <button @click="goBack" class="bg-[#da9a90] text-white px-8 py-4 rounded-xl hover:bg-[#c88980] transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Découvrir nos produits
                    </button>
                </div>
            </div>

            <!-- Contenu du panier -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <!-- Liste des articles -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-200">
                        <p class="text-sm font-semibold text-gray-700">
                            <span class="text-[#da9a90]">{{ totalItems }}</span> article{{ totalItems > 1 ? 's' : '' }} • 
                            Livraison <span class="text-[#da9a90] font-bold">{{ shipping === 0 ? 'GRATUITE' : shipping.toFixed(2) + ' €' }}</span>
                            <span v-if="shipping > 0" class="text-gray-500"> (Gratuite dès 50€)</span>
                        </p>
                    </div>

                    <div v-for="item in cartStore.cart" :key="item.id" 
                         class="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div class="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                            <!-- Image produit -->
                            <div class="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
                                <img :src="item.image" :alt="item.name" 
                                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            </div>

                            <!-- Détails produit -->
                            <div class="flex-grow min-w-0">
                                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{{ item.name }}</h3>
                                <p class="text-gray-600 text-sm mb-4 line-clamp-2" v-html="truncateDescription(item.description)"></p>
                                <div class="flex items-center justify-between">
                                    <p class="text-2xl sm:text-3xl font-black text-[#da9a90]">{{ item.price }} €</p>
                                    <span class="text-xs sm:text-sm text-gray-500 font-medium">
                                        {{ (parseFloat(item.price) * (item.quantity || 1)).toFixed(2) }} € total
                                    </span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-4">
                                <button @click="removeItem(item.id)" 
                                        class="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-300 group/btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                
                                <div class="flex items-center gap-1 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                                    <button @click="decrementQuantity(item)" 
                                            class="px-4 py-2 hover:bg-[#da9a90] hover:text-white transition-colors font-bold text-lg">
                                        −
                                    </button>
                                    <span class="px-4 py-2 font-bold text-lg min-w-[3rem] text-center bg-white">{{ item.quantity || 1 }}</span>
                                    <button @click="incrementQuantity(item)" 
                                            class="px-4 py-2 hover:bg-[#da9a90] hover:text-white transition-colors font-bold text-lg">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Résumé de commande -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-24 border-2 border-gray-200">
                        <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">
                            Résumé
                        </h2>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between text-gray-700">
                                <span class="font-medium">Sous-total</span>
                                <span class="font-bold">{{ subtotal.toFixed(2) }} €</span>
                            </div>
                            <div class="flex justify-between text-gray-700">
                                <span class="font-medium">Livraison</span>
                                <span class="font-bold" :class="shipping === 0 ? 'text-green-600' : ''">
                                    {{ shipping === 0 ? 'GRATUITE' : shipping.toFixed(2) + ' €' }}
                                </span>
                            </div>
                            
                            <div v-if="shipping > 0" class="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p class="text-xs text-green-700 font-semibold">
                                    Plus que {{ (50 - subtotal).toFixed(2) }} € pour la livraison gratuite ! 🎉
                                </p>
                                <div class="w-full bg-green-200 rounded-full h-2 mt-2">
                                    <div class="bg-green-600 h-2 rounded-full transition-all duration-500" 
                                         :style="{width: Math.min((subtotal / 50) * 100, 100) + '%'}"></div>
                                </div>
                            </div>

                            <div class="border-t-2 border-gray-200 pt-4 flex justify-between text-xl sm:text-2xl font-black text-gray-900">
                                <span>Total</span>
                                <span class="text-[#da9a90]">{{ total.toFixed(2) }} €</span>
                            </div>
                        </div>

                        <button @click="OrderPage" 
                                class="w-full bg-[#da9a90] text-white py-4 rounded-xl hover:bg-[#c88980] transition-all duration-300 font-bold text-lg mb-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Passer la commande
                        </button>

                        <button @click="clearCart" 
                                class="w-full border-2 border-red-500 text-red-500 py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold mb-6">
                            Vider le panier
                        </button>

                        <!-- Code promo -->
                        <div class="pt-6 border-t-2 border-gray-200">
                            <label class="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Code promo</label>
                            <div class="flex gap-2">
                                <input v-model="promoCode" 
                                       type="text" 
                                       placeholder="PROMO2024" 
                                       class="flex-grow px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da9a90] focus:border-transparent font-medium">
                                <button @click="applyPromo" 
                                        class="px-5 py-3 bg-[#da9a90] text-white rounded-lg hover:bg-[#c88980] transition-colors font-bold">
                                    OK
                                </button>
                            </div>
                        </div>

                        <!-- Badges de confiance -->
                        <div class="mt-6 pt-6 border-t-2 border-gray-200 grid grid-cols-2 gap-4 text-center">
                            <div class="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#da9a90] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <p class="text-xs font-semibold text-gray-700">Paiement sécurisé</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#da9a90] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <p class="text-xs font-semibold text-gray-700">Garantie satisfait</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <foote />
    <footer1 />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import footer1 from '../../composents/helper/footer1.vue';
import foote from '../../helper/footer.vue';

const cartStore = useCartStore();
const toast = useToast();
const router = useRouter();
const promoCode = ref('');

const totalItems = computed(() => {
    return cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0);
});

const subtotal = computed(() => {
    return cartStore.cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = item.quantity || 1;
        return total + (price * quantity);
    }, 0);
});

const shipping = computed(() => {
    return subtotal.value > 50 ? 0 : 5.99;
});

const total = computed(() => {
    return subtotal.value + shipping.value;
});

const truncateDescription = (description) => {
    const text = description.replace(/<[^>]*>/g, '');
    return text.length > 80 ? text.substring(0, 80) + '...' : text;
};

const removeItem = (id) => {
    cartStore.removeFromCart(id);
    toast.info('Article retiré du panier');
};

const clearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
        cartStore.clearCart();
        toast.success('Panier vidé avec succès');
    }
};

const incrementQuantity = (item) => {
    item.quantity = (item.quantity || 1) + 1;
    toast.success('Quantité mise à jour');
};

const decrementQuantity = (item) => {
    if ((item.quantity || 1) > 1) {
        item.quantity = (item.quantity || 1) - 1;
        toast.success('Quantité mise à jour');
    } else {
        removeItem(item.id);
    }
};

const applyPromo = () => {
    if (promoCode.value.trim()) {
        toast.info('Fonctionnalité de code promo en développement');
        promoCode.value = '';
    }
};

function OrderPage() {
    router.push('/order');
}

const goBack = () => {
    router.back();
};
</script>

<style scoped>
.cart-page {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

button {
    transition: all 0.3s ease;
}

button:active {
    transform: scale(0.97);
}

/* Animation pour les items qui disparaissent */
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>