<template>
    <div :class="[isDarkMode ? 'dark' : '', 'arrivals-container mx-5 my-10']" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>

        <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Recherchez des produits"
                class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg" />

        </div>

        <div class="bg-white  p-6 rounded-lg shadow">
            <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

            <div v-if="paginatedProducts.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(p, index) in paginatedProducts" :key="p.id"
                    class="arrival-item flex flex-col items-center bg-white  rounded-xl p-3 cursor-pointer"
                    :ref="el => (arrivalRefs[index] = el)"
                    @click="openModal(p)" >
                    <img v-if="p.image" :src="p.image" alt="image produit"
                        class="w-full h-40 object-cover rounded-lg shadow-md"
                         />

                    <div class="flex justify-between items-center w-full mt-4">
                        <div>
                            <h3 class="text-lg font-semibold text-green-700 ">
                                {{ p.name }}
                            </h3>
                            <p class="text-gray-600 " v-html="p.description"></p>
                        </div>

                        <div class="flex items-center gap-2">
                        </div>
                    </div>
                </div>
            </div>

            <p v-else class="text-gray-500 dark:text-gray-300 text-center py-6">Aucun produit disponible pour le moment.
            </p>
        </div>

        <div v-if="filteredProducts.length > limit" class="flex justify-center mt-6">
            <button :disabled="currentPage === 1" @click="prevPage"
                class="px-4 py-2 mx-2 bg-gray-300  rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Précédent
            </button>
            <button :disabled="currentPage === totalPages" @click="nextPage"
                class="px-4 py-2 mx-2 bg-gray-300  rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Suivant
            </button>
        </div>
    </div>
    <!-- Modal -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white  rounded-xl p-6 max-w-lg w-full relative">
    <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">&times;</button>

    <img v-if="selectedProduct.image" :src="selectedProduct.image" alt="image produit" class="w-full h-64 object-cover rounded-lg mb-4" />

    <h2 class="text-2xl font-bold text-green-700 mb-2">{{ selectedProduct.name }}</h2>
    <p class="text-gray-700  mb-2"><strong>Prix:</strong> {{ selectedProduct.price }} €</p>
    <p class="text-gray-700  mb-2"><strong>Date:</strong> {{ new Date(selectedProduct.createdAt?.seconds * 1000).toLocaleDateString() }}</p>
    <p class="text-gray-700 " v-html="selectedProduct.description"></p>

    <!-- Bouton Ajouter/Retirer du panier -->
    <button
        @click="toggleCart(selectedProduct)"
        :class="[isInCart(selectedProduct) ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700', 'text-white px-4 py-2 rounded-lg mt-4']">
        {{ isInCart(selectedProduct) ? 'Retiré du panier' : 'Ajouter au panier' }}
    </button>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { db } from '../../../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'


gsap.registerPlugin(ScrollTrigger)

const products = ref([])
const filteredProducts = ref([])
const paginatedProducts = ref([])
const arrivalRefs = ref([])
const searchQuery = ref('')
const selectedFilter = ref('')
const selectedSort = ref('')
const currentPage = ref(1)
const limit = 9
const isDarkMode = ref(false)
const errorMessage = ref('')

const cartStore = useCartStore()
const toast = useToast()


const updatePagination = () => {
    const start = (currentPage.value - 1) * limit
    const end = start + limit
    paginatedProducts.value = filteredProducts.value.slice(start, end)
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        updatePagination()
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        updatePagination()
    }
}

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / limit))

onMounted(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    onSnapshot(q, (snapshot) => {
        try {
            products.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            filteredProducts.value = products.value
            updatePagination()
            setTimeout(setupScrollTrigger, 400)
        } catch (error) {
            errorMessage.value = ('fetchError')
        }
    })
})

watch([searchQuery, selectedFilter, selectedSort], ([newQuery, newFilter]) => {
    let result = products.value

    if (newQuery) {
        result = result.filter((p) =>
            p.name.toLowerCase().includes(newQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(newQuery.toLowerCase())
        )
    }

    if (newFilter) {
        result = result.filter((p) => p.category === newFilter)
    }
    filteredProducts.value = result
    currentPage.value = 1
    updatePagination()
})

const setupScrollTrigger = () => {
    arrivalRefs.value.forEach((el) => {
        if (el) {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    once: true,
                },
            })
        }
    })
}

const showModal = ref(false)
const selectedProduct = ref(null)

const openModal = (product) => {
    selectedProduct.value = product
    showModal.value = true
}

// fonction pour fermer le modal
const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}

const isInCart = (product) => {
    return cartStore.cart.some((item) => item.id === product.id)
}



const toggleCart = (product) => {
    console.log('Toggling cart for product:', product);
    if (isInCart(product)) {
        console.log('Removing from cart:', product.id);
        cartStore.removeFromCart(product.id);
        toast.info(`${product.name} retiré du panier!`);
    } else {
        console.log('Adding to cart:', product);
        cartStore.addToCart(product);
        toast.success(`${product.name} ajouté au panier!`);
    }
};
</script>

<style scoped>
.arrivals-container {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 20px;
}

.dark {
    background-color: #1a202c;
    color: #f7fafc;
}

img {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

img:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

button {
    transition: background-color 0.3s ease, transform 0.3s ease;
}
</style>