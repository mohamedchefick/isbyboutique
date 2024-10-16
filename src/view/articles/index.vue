<template>
    <div>
      <!-- Ici, on inclut le composant Articles -->
      <Articles />
    </div>
  </template>
  
  <script>
  import Articles from '@/components/articles/articles.vue';
  
  export default {
    name: 'TheArticle', // Nom du composant en PascalCase
    components: {
        Articles, // Enregistrement du composant Articles
    },
  };
  </script>
  