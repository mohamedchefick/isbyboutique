<template>
    <div>
        <Heade />
        <div class="w-11/12 md:w-3/4 mx-auto mb-10"> <!-- Ajustement de la largeur pour les écrans plus grands -->
            <!-- Image avec coins arrondis -->
            <img :src="arrival1" alt="Arrival Image" class="w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-2xl object-cover mx-auto"> 
        </div>

        <div class="text-center p-4 bg-white rounded-2xl mb-10 shadow-lg transition-transform transform hover:scale-105">
            <h3 class="text-lg font-semibold">Zara New</h3>
            <p class="text-gray-500">2024</p>
        </div>

        <div class="w-11/12 md:w-4/5 mx-auto my-7"> <!-- Ajustement de la largeur pour les écrans plus grands -->
            <p class="text-gray-700 text-base md:text-lg"> <!-- Ajustement de la taille de la police -->
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        <Foote/>
    </div>
</template>

<script>
import Heade from '../../components/helper/header.vue';
import Foote from '../../components/helper/footer.vue';
import arrival1 from '../../images/arrival1.png';

export default {
    name: 'ArrivalComponent',
    components: {
        Heade, Foote
    },
    data() {
        return {
            arrival1, // Référence à l'image importée
        };
    },
};
</script>
