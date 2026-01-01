import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Charger le panier depuis localStorage au démarrage
  const loadCartFromStorage = () => {
    try {
      const stored = localStorage.getItem('cartItems')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error)
      return []
    }
  }

  const cart = ref(loadCartFromStorage())

  // Sauvegarder automatiquement dans localStorage à chaque modification
  watch(
    cart,
    (newCart) => {
      try {
        localStorage.setItem('cartItems', JSON.stringify(newCart))
        console.log('💾 Panier sauvegardé:', newCart)
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error)
      }
    },
    { deep: true }
  )

  // Ajouter un article au panier
  const addToCart = (product) => {
    const existingItem = cart.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1
    } else {
      cart.value.push({
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.img, // ✅ Important: sauvegarder l'image
        description: product.description || '',
        quantity: 1
      })
    }
  }

  // Retirer un article du panier
  const removeFromCart = (productId) => {
    const index = cart.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  // Vider le panier
  const clearCart = () => {
    cart.value = []
    localStorage.removeItem('cartItems')
  }

  // Mettre à jour la quantité
  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  // Calculer le prix total
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalPrice
  }
})
