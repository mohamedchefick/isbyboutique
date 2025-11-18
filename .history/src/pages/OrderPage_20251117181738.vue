<template>
  <div :class="[isDarkMode ? 'dark' : '', 'arrivals-container md:mx-10 my-10']" ref="arrivalsContainer">
      <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>

      <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
          <input v-model="searchQuery" type="text" placeholder="Recherchez des produits"
              class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg" />
      </div>

      <div class="bg-white rounded-lg">
          <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

          <div v-if="paginatedProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="(p, index) in paginatedProducts" :key="p.id"
                  class="arrival-item flex flex-col items-center bg-white shadow-2xl rounded-xl p-3 cursor-pointer "
                  :ref="el => (arrivalRefs[index] = el)"
                  @click="goToProductDetails(p.id)" >
                  <img v-if="p.image" :src="p.image" alt="image produit"
                      class="w-full h-64 object-cover rounded-lg shadow-md"
                       />

                  <div class="flex items-start w-full mt-4">

                      <div class="flex-1">
                          <h3 class="text-lg font-semibold text-green-700 " :title="p.name">
                              {{ truncateText(p.name, 40) }}
                          </h3>
                          <p class="text-gray-600 " v-text="truncateHtmlToText(p.description, 100)"></p>
                      </div>
                      <!-- Bouton flèche à gauche — clique uniquement sur le bouton ouvre la page de détails -->
                      <button
                          @click.stop="goToProductDetails(p.id)"
                          class="bg-[#da9a90] text-white px-4 py-2 rounded-lg transition-transform hover:bg-[#814255] hover:scale-105 mr-3">
                          &rarr;
                      </button>
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
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)
const router = useRouter()

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

const goToProductDetails = (productId) => {
router.push({ name: 'ProductDetails', params: { id: productId } })
}

// Tronque un texte simple (titre, etc.)
const truncateText = (text, limit) => {
  if (!text) return ''
  return text.length > limit ? text.slice(0, limit) + '...' : text
}

// Convertit HTML en texte brut puis tronque (pour la description qui est en HTML)
const truncateHtmlToText = (html, limit) => {
  if (!html) return ''
  if (typeof document === 'undefined') {
      // fallback: enlever quelques balises basiques si exécuté côté serveur
      const plain = html.replace(/<[^>]+>/g, '')
      return plain.length > limit ? plain.slice(0, limit) + '...' : plain
  }
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const text = tmp.textContent || tmp.innerText || ''
  return text.length > limit ? text.slice(0, limit) + '...' : text
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
  background-color: #fff;
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