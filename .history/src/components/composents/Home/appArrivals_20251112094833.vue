<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        <div class="bg-white p-6 rounded-lg shadow">
            <div v-if="products.length">
                <div v-for="p in products" :key="p.id"
                    class="border-b py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                    <div @click="selectProduct(p)">
                        <h3 class="font-bold text-green-700">{{ p.name }}</h3>
                        <p class="text-gray-600" v-html="p.description"></p>
                    </div>
                </div>
            </div>
            <p v-else class="text-gray-500">Aucun produit disponible</p>
        </div>
        <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700" @click="selectedProduct = null">
          ✖
        </button>
        <h2 class="text-2xl font-bold mb-2">{{ selectedProduct.name }}</h2>
        <p class="mb-2 text-gray-700">
          Prix : {{ formatPrice(selectedProduct.price) }}
        </p>
        <div class="mb-4">
          <img v-if="selectedProduct.image" :src="selectedProduct.image" alt="image produit" class="w-full h-auto rounded object-cover mb-4" />
          <div v-html="selectedProduct.description"></div>
        </div>
        <p class="text-sm text-gray-400">
          Ajouté le :
          {{ selectedProduct.createdAt?.toDate().toLocaleString() || 'Non défini' }}
        </p>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const products = ref([])
const loading = ref(true)

onMounted(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    onSnapshot(q, snapshot => {
        products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        loading.value = false
    })
})

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
