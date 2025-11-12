<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">Liste des produits</h2>
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from './'
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
