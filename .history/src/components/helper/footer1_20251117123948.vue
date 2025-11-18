<template>
    <div ref="footer" class="bg-[#da9a90] h-96 flex flex-col justify-center items-center">
        <!-- Titre principal -->
        <p class="text-3xl text-center font-extrabold">JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</p>
        <!-- Sous-titre -->
        <p class="text-xl text-center mt-4">Type your email down below and be young wild generation</p>
    </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
    name: 'TheFooter1',
    mounted() {
        // Animation avec ScrollTrigger
        gsap.from(this.$refs.footer, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: this.$refs.footer,
                start: "top 80%", // Début de l'animation quand le haut du footer atteint 80% de la fenêtre
                toggleActions: "play none none reverse", // Jouer l'animation lors de l'entrée et la rejouer lors de la sortie
            }
        });
    },
}
</script>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
</style>
