<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Liste des produits</h2>
      <div v-if="products.length">
        <div v-for="p in products" :key="p.id"
          class="border-b py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div @click="selectProduct(p)">
            <h3 class="font-bold text-green-700">{{ p.name }}</h3>
            <p class="text-gray-600" v-html="p.description || 'Contenu vide'"></p>
          </div>
          <div class="flex gap-2">
            <button class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500" @click.stop="startEdit(p)">
              Modifier
            </button>
            <button class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" @click.stop="deleteProduct(p.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500">Aucun produit disponible</p>
    </div>
        </div>
    </div>
</template>

<script>

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
