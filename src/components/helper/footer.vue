<template>
    <footer ref="footer" class="bg-[#000] text-white p-6">
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="flex-1 mb-4 md:mb-0 md:text-center">
                <p class="text-2xl font-bold">@LABOUTIQUE_CHINE</p>
                <p class="mt-2">Votre style commence ici...</p>
            </div>
            <div class="flex-1 text-left md:text-center">
                
                <p class="mt-4 text-xl">Restez informé des dernières tendances et offres !</p>
            </div>
            <div class="flex-1 text-left md:text-center mt-4 md:mt-0">
    <p class="text-lg font-semibold">Suivez-nous</p>
    <div class="flex flex-col justify-between items-center h-full mt-2 gap-4">
        <a href="https://www.facebook.com/profile.php?id=61570139615872&mibextid=wwXIfr&rdid=d4P9XY0Z7P38jUTp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17csva2caz%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" class="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <box-icon type='logo' name='facebook' class="bg-[#da9a90] rounded-md"></box-icon>
            <span>Facebook</span>
        </a>
        <a href="https://api.whatsapp.com/message/HKOTC2MUG6VGD1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" class="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <box-icon name='whatsapp' type='logo' color="#000" class="bg-[#da9a90] rounded-md"></box-icon>
            <span>WhatsApp</span>
        </a>
        <a href="https://www.instagram.com/produits_chine_gros_detail?igsh=Y3pramNmNW5iOGI%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" class="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <box-icon type='logo' name='instagram-alt' class="bg-[#da9a90] rounded-md"></box-icon>
            <span>Instagram</span>
        </a>
    </div>
</div>

        </div>
        <hr class="mt-4">
        <div class="mt-6 text-center text-sm">
            <p>&copy; 2025 LABOUTIQUE_CHINE. Tous droits réservés.</p>
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
