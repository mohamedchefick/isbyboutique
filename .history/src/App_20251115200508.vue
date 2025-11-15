<script setup>
import heder from './';
import foote from './components/helper/footer.vue';
</script>

<template>
  <div class="italic">
    <heder/>
    <RouterView />
    <foote/>
  </div>
</template>

<style scoped>
</style>