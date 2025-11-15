<script setup>
import heder from './components/';
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