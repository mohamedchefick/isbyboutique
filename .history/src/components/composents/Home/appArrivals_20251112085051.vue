<template>
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

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
