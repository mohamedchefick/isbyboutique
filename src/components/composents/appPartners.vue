<template>
    <div class="partners-container mx-auto my-10 overflow-hidden">
      <div class="scrolling-wrapper">
        <div class="scrolling-content">
          <div v-for="(partner, index) in duplicatedPartners" :key="`partner-${index}`" class="partner-item">
            <img :src="partner.image" :alt="partner.name" class="w-32 h-32 object-contain">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import adidas from '../../images/adidas.png';
  import hm from '../../images/h&m.png';
  import lacoste from '../../images/lacoste.png';
  import nike from '../../images/nike.png';
  import ysl from '../../images/ysl.png';
  import zara from '../../images/zara.png';
  import cartier from '../../images/cartier.png';
  import ck from '../../images/ck.png';
  import underArmour from '../../images/underArmou.png';
  import dior from '../../images/Dior.webp';
  import cc from '../../images/cc.webp';
  
  const partners = [
    { name: 'Adidas', image: adidas },
    { name: 'H&M', image: hm },
    { name: 'Lacoste', image: lacoste },
    { name: 'Nike', image: nike },
    { name: 'YSL', image: ysl },
    { name: 'Zara', image: zara },
    { name: 'Cartier', image: cartier },
    { name: 'Calvin Klein', image: ck },
    { name: 'Under Armour', image: underArmour },
    { name: 'Dior', image: dior },
    { name: 'CC', image: cc },
  ];
  
  // Dupliquer les partenaires pour créer un effet de boucle infini
  const duplicatedPartners = computed(() => {
    return [...partners, ...partners, ...partners];
  });
  </script>
  
  <style scoped>
  .partners-container {
    padding: 20px;
    background-color: #da9a90;
  }
  
  .scrolling-wrapper {
    overflow: hidden;
    width: 100%;
  }
  
  .scrolling-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    animation: scroll 20s linear infinite;
    width: fit-content;
  }
  
  .partner-item {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  img {
    transition: transform 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.1);
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.333%);
    }
  }
  </style>
  