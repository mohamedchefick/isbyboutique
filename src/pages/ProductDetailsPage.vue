<template>
  <heade />
  <div :class="[isDarkMode ? 'dark' : '', 'details-container min-h-screen']">
    
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>

    <!-- Erreur -->
    <div v-else-if="errorMessage" class="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-8">
      {{ errorMessage }}
    </div>

    <!-- Détails du produit -->
    <div v-else-if="product">
      
      <!-- Bouton retour -->
      <div class="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <RouterLink 
            to="/" 
            class="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            <span class="mr-2 text-xl">←</span>
            Retour aux produits
          </RouterLink>
        </div>
      </div>

      <!-- Hero Section - Image uniquement -->
      <div class="w-full bg-gray-100">
        <div class="max-w-7xl mx-auto px-2">
          <img 
            v-if="product.image" 
            :src="product.image" 
            :alt="product.name"
            class=" md:object-contain h-[30vh] md:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          
          <!-- En-tête produit -->
          <div class="mb-8 sm:mb-12">
            <!-- Badge catégorie -->
            <div class="mb-4">
              <span class="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                {{ product.category || 'Produit' }}
              </span>
            </div>

            <!-- Titre -->
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {{ product.name }}
            </h1>

            <!-- Grille d'informations clés -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              
              <!-- Prix -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-6 border-2 border-green-200">
                <p class="text-green-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">Prix</p>
                <p class="text-4xl sm:text-5xl font-black text-green-600">
                  {{ product.price }} <span class="text-2xl sm:text-3xl">F CFA</span>
                </p>
              </div>

              <!-- Stock -->
              <!-- <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-6 border-2 border-gray-200">
                <p class="text-gray-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">Disponibilité</p>
                <p :class="[product.stock > 0 ? 'text-green-600' : 'text-red-600', 'text-xl sm:text-2xl font-bold']">
                  {{ product.stock > 0 ? `${product.stock} unités` : 'Rupture de stock' }}
                </p>
              </div> -->

              <!-- Date d'ajout -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-6 border-2 border-blue-200 sm:col-span-2 lg:col-span-1">
                <p class="text-blue-700 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">Ajouté le</p>
                <p class="text-lg sm:text-xl font-bold text-blue-600">{{ formatDate(product.createdAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16">
            <button
              @click="toggleCart"
              :disabled="product.stock === 0"
              :class="[
                isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700',
                'text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              ]"
            >
              {{ isInCart ? '✓ Retirer du panier' : '+ Ajouter au panier' }}
            </button>
            
            <button
              @click="toggleWishlist"
              :class="[
                isInWishlist ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-200 hover:bg-gray-300',
                isInWishlist ? 'text-white' : 'text-gray-700',
                'px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              ]"
            >
              <span class="text-2xl sm:text-3xl">{{ isInWishlist ? '♥' : '♡' }}</span>
            </button>
          </div>

          <!-- Séparateur -->
          <div class="border-t-2 border-gray-200 my-8 sm:my-12"></div>

          <!-- Description -->
          <div class="mb-12 sm:mb-16">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span class="w-1.5 h-8 sm:h-10 bg-green-600 mr-3 sm:mr-4 rounded-full"></span>
              Description du produit
            </h2>
            <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
              <p class="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed" v-html="product.description"></p>
            </div>
          </div>

          <!-- Informations techniques -->
          <div class="mb-12 sm:mb-16">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span class="w-1.5 h-8 sm:h-10 bg-green-600 mr-3 sm:mr-4 rounded-full"></span>
              Informations techniques
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <p class="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">ID du produit</p>
                <p class="text-gray-900 font-mono text-sm sm:text-base lg:text-lg break-all">{{ product.id }}</p>
              </div>
              
              <div v-if="product.sku" class="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <p class="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">SKU</p>
                <p class="text-gray-900 text-base sm:text-lg">{{ product.sku }}</p>
              </div>
            </div>
          </div>

          <!-- Produits similaires -->
          <div v-if="similarProducts.length > 0">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center">
              <span class="w-1.5 h-8 sm:h-10 bg-green-600 mr-3 sm:mr-4 rounded-full"></span>
              Produits similaires
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div 
                v-for="similarProduct in similarProducts" 
                :key="similarProduct.id"
                class="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 overflow-hidden group border border-gray-200"
                @click="goToProduct(similarProduct.id)"
              >
                <div class="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                  <img 
                    v-if="similarProduct.image" 
                    :src="similarProduct.image" 
                    :alt="similarProduct.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div class="p-4 sm:p-6">
                  <h3 class="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 line-clamp-2">
                    {{ similarProduct.name }}
                  </h3>
                  <p class="text-green-600 font-black text-xl sm:text-2xl">{{ similarProduct.price }} F CFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <foote />
</template>

<script setup>
import heade from '@/components/helper/appHeader.vue'
import foote from '@/components/helper/footer.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { db } from '@/firebase'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const product = ref(null)
const loading = ref(true)
const errorMessage = ref('')
const isDarkMode = ref(false)
const similarProducts = ref([])
const wishlist = ref([])

const productId = computed(() => route.params.id)

const formatDate = (timestamp) => {
  if (!timestamp) return 'Date inconnue'
  const date = new Date(timestamp.seconds * 1000)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const isInCart = computed(() => {
  return cartStore.cart.some((item) => item.id === product.value?.id)
})

const isInWishlist = computed(() => {
  return wishlist.value.some((item) => item.id === product.value?.id)
})

const toggleCart = () => {
  if (!product.value) return

  if (isInCart.value) {
    cartStore.removeFromCart(product.value.id)
    toast.info(`${product.value.name} retiré du panier!`)
  } else {
    cartStore.addToCart(product.value)
    toast.success(`${product.value.name} ajouté au panier!`)
  }
}

const toggleWishlist = () => {
  if (!product.value) return

  if (isInWishlist.value) {
    wishlist.value = wishlist.value.filter((item) => item.id !== product.value.id)
    toast.info(`${product.value.name} retiré de la liste de souhaits!`)
  } else {
    wishlist.value.push(product.value)
    toast.success(`${product.value.name} ajouté à la liste de souhaits!`)
  }
}

const loadSimilarProducts = async (category) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category)
    )
    const snapshot = await getDocs(q)
    similarProducts.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((p) => p.id !== product.value.id)
      .slice(0, 3)
  } catch (error) {
    console.error('Erreur lors du chargement des produits similaires:', error)
  }
}

const goToProduct = (id) => {
  router.push({ name: 'ProductDetails', params: { id } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const docRef = doc(db, 'products', productId.value)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      product.value = { id: docSnap.id, ...docSnap.data() }
      await loadSimilarProducts(product.value.category)
    } else {
      errorMessage.value = 'Produit non trouvé'
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors du chargement du produit'
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.details-container {
  background-color: #ffffff;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations fluides */
* {
  transition-property: transform, box-shadow, background-color;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

/* Animation d'entrée */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-container > div {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive text pour très petits écrans */
@media (max-width: 375px) {
  h1 {
    font-size: 1.875rem;
  }
}
</style>