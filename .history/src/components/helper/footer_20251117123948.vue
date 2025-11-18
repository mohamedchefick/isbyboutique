<template>
    <footer ref="footer" class="bg-[#000] text-white p-6">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="flex-1 mb-4 md:mb-0 md:text-center">
                <p class="text-2xl font-bold">@LABOUTIQUE_CHINE</p>
                <p class="mt-2">Votre style commence ici...</p>
            </div>
            <div class="flex-1 text-left md:text-center">
                <p class="text-lg font-semibold">Abonnez-vous à notre newsletter</p>
                <div class="flex flex-col md:flex-row md:items-center justify-center mt-2">
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        class="p-2 rounded-lg border-2 border-[#da9a90] bg-transparent text-white placeholder:text-gray-400 focus:outline-none transition duration-200"
                    />
                    <button class="mt-2 font-semibold md:mt-0 md:ml-2 bg-[#] border-[#da9a90] border-2 text-[#da9a90] hover:text-black rounded-lg p-2 hover:bg-[#da9a99ed] transition duration-200">
                        S'abonner
                    </button>
                </div>
                <p class="mt-4 text-sm">Restez informé des dernières tendances et offres !</p>
            </div>
            <div class="flex-1 text-left md:text-center mt-4 md:mt-0">
    <p class="text-lg font-semibold">Suivez-nous</p>
    <div class="flex flex-col justify-between items-center h-full mt-2 gap-4">
        <div class="flex gap-2 items-center">
            <box-icon type='logo' name='facebook' class="bg-[#da9a90] rounded-md"></box-icon>
            <span>Facebook</span>
        </div>
        <div class="flex gap-2 items-center">
            <box-icon name='whatsapp' type='logo' color="#000" class="bg-[#da9a90] rounded-md"></box-icon>
            <span>WhatsApp</span>
        </div>
        <div class="flex gap-2 items-center">
            <box-icon type='logo' name='instagram-alt' class="bg-[#da9a90] rounded-md"></box-icon>
            <span>Instagram</span>
        </div>
    </div>
</div>

        </div>
        <hr class="mt-4">
        <div class="mt-6 text-center text-sm">
            <p>&copy; 2024 LABOUTIQUE_CHINE. Tous droits réservés.</p>
        </div>
    </footer>
</template>

<script>
import 'boxicons';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
    name: 'TheFooter',
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
/* Ajoutez des styles supplémentaires ici si nécessaire */
</style>
