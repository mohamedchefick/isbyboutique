<template>
    <div class="flex justify-between mx-5 items-center">
        <!-- Logo -->
        <div>
            <img :src="images.LOGO" alt="Logo" class="w-40 h-24 md:w-52 md:h-32 object-cover">
        </div>
        <!-- Menu burger (petits écrans) -->
        <div class="md:hidden">
            <button @click="toggleMenu" class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
        <!-- Menu (grands écrans) -->
        <div class="hidden md:flex items-center gap-5 md:-mt-6">
            <a href="" class="relative group">
                HOME
                <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="" class="relative group">
                ARRIVAL
                <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="" class="relative group">
                PARTNERS
                <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="" class="relative group">
                LIFESTYLE
                <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <RouterLink to="/panier" class="relative group flex items-center gap-1">
                PANIER
                <span v-if="cartStore.cart.length > 0" class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {{ cartStore.cart.length }}
                </span>
                <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
            </RouterLink>
        </div>
        <div class="hidden md:flex items-center gap-5 md:-mt-6">
            <button class="border-2 border-[#da9a90] text-[#da9a90] hover:bg-[#da9a90] duration-200 px-6 py-3 rounded-lg hover:text-white font-semibold">CONTACT ME</button>
        </div>
        <!-- Menu déroulant (petits écrans) -->
        <div v-if="menuOpen" class="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
            <div class="flex flex-col items-center gap-3 py-4">
                <a href="" class="w-full text-center py-2 relative group">
                    HOME
                    <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="" class="w-full text-center py-2 relative group">
                    ARRIVAL
                    <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="" class="w-full text-center py-2 relative group">
                    PARTNERS
                    <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="" class="w-full text-center py-2 relative group">
                    LIFESTYLE
                    <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <RouterLink to="/panier" class="w-full text-center py-2 relative group flex items-center justify-center gap-1">
                    PANIER
                    <span v-if="cartStore.cart.length > 0" class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {{ cartStore.cart.length }}
                    </span>
                    <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#da9a90] transition-all duration-300 group-hover:w-full"></span>
                </RouterLink>
                <button class="border-2 border-[#da9a90] text-[#da9a90] hover:bg-[#da9a90] duration-200 px-6 py-3 rounded-lg hover:text-white font-semibold">CONTACT ME</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import LOGO from "@/images/logolbc.png";
import { useCartStore } from '@/stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();

// Images
const images = ref({ LOGO });

// État du menu burger
const menuOpen = ref(false);

// Toggle du menu
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};
</script>