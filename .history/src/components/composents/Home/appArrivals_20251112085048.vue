<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        
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
