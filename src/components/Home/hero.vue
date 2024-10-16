<template>
    <div class="min-h-[60vh] shadow-2xl md:h-screen bg-cover bg-center mx-5 rounded-2xl flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 p-5"
         :style="{ backgroundImage: `url(${images.IMGHero})` }">
        <!-- Texte principal -->
        <div class="text-center md:text-left text-2xl md:text-4xl font-bold italic leading-tight md:w-1/2 bg-white bg-opacity-70 p-5 rounded-lg">
            <span class="border-b-2 border-black">LA BOUTIQUE CHINE</span>
            <br>
            <span class="bg-[#da9a90] px-2 py-1 inline-block mt-2">
                LET’S EXPLORE UNIQUE CLOTHES.
            </span>
        </div>
    </div>
</template>

<script>
import IMGHero from '../../images/hero.jpeg';

export default {
    name: 'the-hero',
    data() {
        return {
            images: { IMGHero }
        };
    }
}
</script>
