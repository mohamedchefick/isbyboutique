<template>
    <div class="partners-container mx-auto my-10">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center justify-center">
        <div v-for="(partner, index) in partners" :key="index" class="flex justify-center partner-item">
          <img :src="partner.image" :alt="partner.name" class="w-32 h-32 object-contain">
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import adidas from '../../images/adidas.png';
  import hm from '../../images/h&m.png';
  import lacoste from '../../images/lacoste.png';
  import nike from '../../images/nike.png';
  import ysl from '../../images/ysl.png';
  import zara from '../../images/zara.png';
  
  // Enregistre le plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  const partners = [
    { name: 'Adidas', image: adidas },
    { name: 'H&M', image: hm },
    { name: 'Lacoste', image: lacoste },
    { name: 'Nike', image: nike },
    { name: 'YSL', image: ysl },
    { name: 'Zara', image: zara },
  ];
  
  // Animation lors du montage
  onMounted(() => {
    const items = document.querySelectorAll('.partner-item');
  
    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 30, // Déplacer vers le bas
        duration: 0.5,
        delay: index * 0.1, // Délai d'animation pour chaque élément
        scrollTrigger: {
          trigger: item,
          start: 'top 80%', // Démarrer l'animation lorsque le haut de l'élément atteint 80% de la fenêtre
          toggleActions: 'play none none reverse',
        },
      });
    });
  });
  </script>
  
  <script>
  // Ajouter le nom du composant ici
  export default {
    name: 'ThePartenaire',  // Utilise camelCase ou kebab-case, selon ta préférence
  };
  </script>
  
  <style scoped>
  .partners-container {
    padding: 20px;
    background-color: #da9a90;
  }
  
  img {
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.1);
  }
  </style>
  