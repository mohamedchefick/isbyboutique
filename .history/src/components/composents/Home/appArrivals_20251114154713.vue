<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>

        <!-- Barre de recherche et filtres -->
        <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un produit..."
                class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
            />

            <select v-model="selectedFilter" class="p-2 border border-gray-300 rounded-lg">
                <option value="">Tous</option>
                <option value="category1">Catégorie 1</option>
                <option value="category2">Catégorie 2</option>
            </select>

            <select v-model="selectedSort" class="p-2 border border-gray-300 rounded-lg">
                <option value="">Trier par</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
            </select>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <div v-if="paginatedProducts.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(p, index) in paginatedProducts" :key="p.id"
                    class="arrival-item flex flex-col items-center bg-white rounded-xl p-3 cursor-pointer"
                    :ref="el => (arrivalRefs[index] = el)">
                    <img v-if="p.image" :src="p.image" alt="image produit"
                        class="w-full h-64 object-cover rounded-lg shadow-md" />

                    <div class="flex justify-between items-center w-full mt-4">
                        <div>
                            <h3 class="text-lg font-semibold text-green-700">
                                {{ p.name }}
                            </h3>
                            <p class="text-gray-600" v-html="p.description"></p>
                        </div>

                        <button
                            @click="addToCart(p)"
                            class="bg-[#da9a90] text-white px-4 py-2 rounded-lg transition-transform hover:bg-[#814255] hover:scale-105">
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>

            <p v-else class="text-gray-500 text-center py-6">Aucun produit disponible pour le moment</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProducts.length > limit" class="flex justify-center mt-6">
            <button
                :disabled="currentPage === 1"
                @click="prevPage"
                class="px-4 py-2 mx-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Précédent
            </button>
            <button
                :disabled="currentPage === totalPages"
                @click="nextPage"
                class="px-4 py-2 mx-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Suivant
            </button>
        </div>

        <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="selectedProduct = null">
            <div class="bg-white rounded-lg p-6 max-w-md w-full relative">
                <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    @click="selectedProduct = null">
                    &times;
                </button>
                <h2 class="text-2xl font-bold mb-2">{{ selectedProduct.name }}</h2>
                <p class="mb-2 text-gray-700">
                    Prix: {{ formatPrice(selectedProduct.price) }}
                </p>
                <div class="mb-4">
                    <img v-if="selectedProduct.image" :src="selectedProduct.image" alt="image produit"
                        class="w-full h-auto rounded object-cover mb-4" />
                    <div v-html="selectedProduct.description"></div>
                </div>
                <p class="text-sm text-gray-400">
                Ajouté le:
                    {{ selectedProduct.createdAt?.toDate().toLocaleString() || 'Non défini' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { db } from '../../../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = ref([])
const filteredProducts = ref([])
const paginatedProducts = ref([])
const selectedProduct = ref(null)
const arrivalRefs = ref([])
const searchQuery = ref('')
const selectedFilter = ref('')
const selectedSort = ref('')
const currentPage = ref(1)
const limit = 9
const cart = ref([])

/* const selectProduct = (p) => {
    selectedProduct.value = p
} */

const formatPrice = (p) => (typeof p === 'number' ? p.toFixed(2) + ' €' : p)

const addToCart = (product) => {
    cart.value.push(product)
    alert(`${product.name} a été ajouté au panier !`)
}

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
        products.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        filteredProducts.value = products.value
        updatePagination()
        setTimeout(setupScrollTrigger, 400)
    })
})

watch([searchQuery, selectedFilter, selectedSort], ([newQuery, newFilter, newSort]) => {
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

    if (newSort === 'price-asc') {
        result = result.sort((a, b) => a.price - b.price)
    } else if (newSort === 'price-desc') {
        result = result.sort((a, b) => b.price - a.price)
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
</script>

<style scoped>
.arrivals-container {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 20px;
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