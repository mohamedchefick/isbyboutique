import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

    watch(cart, (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart))
    }, { deep: true })

    const addToCart = (product) => {
        const existing = cart.value.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }
    }

    const totalItems = computed(() => 
        cart.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const totalPrice = computed(() => 
        cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    return { cart, addToCart, totalItems, totalPrice }
})
