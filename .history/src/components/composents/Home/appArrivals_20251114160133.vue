<template>
    <div :class="[isDarkMode ? 'dark' : '', 'arrivals-container mx-5 my-10']" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>

        <!-- Barre de recherche et filtres -->
        <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Recherchez "
                class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
            />


        <!--     <select v-model="selectedSort" class="p-2 border border-gray-300 rounded-lg">
                <option value="">{{ $t('sortBy') }}</option>
                <option value="price-asc">Prix Demandé</option>
                <option value="price-desc">Prix négocié</option>
            </select>
 -->
 <!--            <button @click="toggleDarkMode" class="p-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                {{ isDarkMode ? LightMode : darkMode }}
            </button>
  -->       </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

            <div v-if="paginatedProducts.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(p, index) in paginatedProducts" :key="p.id"
                    class="arrival-item flex flex-col items-center bg-white dark:bg-gray-700 rounded-xl p-3 cursor-pointer"
                    :ref="el => (arrivalRefs[index] = el)">
                    <img v-if="p.image" :src="p.image" alt="image produit"
                        class="w-full h-64 object-cover rounded-lg shadow-md" />

                    <div class="flex justify-between items-center w-full mt-4">
                        <div>
                            <h3 class="text-lg font-semibold text-green-700 dark:text-green-400">
                                {{ p.name }}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300" v-html="p.description"></p>
                        </div>

                        <div class="flex items-center gap-2">
                            <button
                                @click="toggleFavorite(p)"
                                :class="[isFavorite(p) ? 'text-red-500' : 'text-gray-500', 'hover:text-red-700']">
                                ♥
                            </button>
                            <button
                                @click="addToCart(p)"
                                class="bg-[#da9a90] text-white px-4 py-2 rounded-lg transition-transform hover:bg-[#814255] hover:scale-105">
                                Ajouté au panier
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <p v-else class="text-gray-500 dark:text-gray-300 text-center py-6">Aucun produit disponible pour le moment.</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProducts.length > limit" class="flex justify-center mt-6">
            <button
                :disabled="currentPage === 1"
                @click="prevPage"
                class="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Précédent
            </button>
            <button
                :disabled="currentPage === totalPages"
                @click="nextPage"
                class="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50">
                Suivant
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
const cart = ref([])
const favorites = ref([])
const isDarkMode = ref(false)
const errorMessage = ref('')

/* const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
}
 */
const addToCart = (product) => {
    cart.value.push(product)
    alert(`${product.name}  ajouté au panier`)
}

const toggleFavorite = (product) => {
    const index = favorites.value.findIndex((fav) => fav.id === product.id)
    if (index === -1) {
        favorites.value.push(product)
    } else {
        favorites.value.splice(index, 1)
    }
}

const isFavorite = (product) => {
    return favorites.value.some((fav) => fav.id === product.id)
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
/* 
    if (newSort === 'price-asc') {
        result = result.sort((a, b) => a.price - b.price)
    } else if (newSort === 'price-desc') {
        result = result.sort((a, b) => b.price - a.price)
    }
 */
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