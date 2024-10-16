<template>
    <div class="shadow-2xl">
    <Heade />
</div>
    <hr class="shado">
    <div class="arrivals-container mx-5 my-10" ref="arrivalsContainer">
        <h2 class="text-center text-3xl font-bold mb-8">Nouvelles Arrivées</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
                v-for="(arrival, index) in arrivals"
                :key="index"
                class="arrival-item flex flex-col items-center bg-white rounded-xl p-3"
                :ref="`arrival-${index}`"
            >
                <!-- Image des arrivées -->
                <img :src="arrival.image" :alt="'Arrival ' + (index + 1)" class="w-full h-64 object-cover rounded-lg shadow-md">

                <!-- Texte et bouton arrangés en justified-between -->
                <div class="flex justify-between items-center w-full mt-4">
                    <!-- Texte de l'arrivée -->
                    <div>
                        <p class="text-lg font-semibold">
                            {{ arrival.text }}
                            <br>
                            <span class="text-md font-light">{{ arrival.texte2 }}</span>
                        </p>
                    </div>

                    <!-- Bouton flèche -->
                    <button class="bg-[#da9a90] text-white px-4 py-2 rounded-lg transition-transform hover:bg-[#814255] hover:scale-105">
                        &rarr;
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Foote />
</template>

<script>
import { gsap } from "gsap"; // Importer GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importer ScrollTrigger
import arrival1 from '../../images/arrival1.png';
import arrival2 from '../../images/arrival2.png';
import arrival3 from '../../images/arrival3.png';
import Heade from "../helper/header.vue";
import Foote from "../helper/footer.vue";

// Enregistre ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'The-Arrivals',
  components: {
    Heade, Foote
  },
  data() {
    return {
      arrivals: [
        { image: arrival3, text: 'Robe d\'été élégante', texte2: 'Parfaite pour toutes occasions' },
        { image: arrival2, text: 'Sneakers édition limitée', texte2: 'Confortables et stylées' },
        { image: arrival1, text: 'Veste en jean tendance', texte2: 'Disponible en plusieurs tailles' },
        // Duplication pour l'exemple
        { image: arrival1, text: 'Veste en jean tendance', texte2: 'Disponible en plusieurs tailles' },
        { image: arrival3, text: 'Robe d\'été élégante', texte2: 'Parfaite pour toutes occasions' },
        { image: arrival2, text: 'Sneakers édition limitée', texte2: 'Confortables et stylées' },
        { image: arrival3, text: 'Robe d\'été élégante', texte2: 'Parfaite pour toutes occasions' },
        { image: arrival2, text: 'Sneakers édition limitée', texte2: 'Confortables et stylées' },
        { image: arrival1, text: 'Veste en jean tendance', texte2: 'Disponible en plusieurs tailles' },
      ]
    };
  },
  mounted() {
    this.setupScrollTrigger();
  },
  methods: {
    setupScrollTrigger() {
      this.arrivals.forEach((_, index) => {
        gsap.from(this.$refs[`arrival-${index}`], {
          opacity: 0,
          y: 50,
          duration: 0.5,
          scrollTrigger: {
            trigger: this.$refs[`arrival-${index}`],
            start: "top 80%",
            toggleActions: "play none none reverse",
            once: true
          }
        });
      });
    }
  }
}
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
