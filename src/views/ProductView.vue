<script setup lang="ts">
// 1. IMPORT watchEffect
import { ref, watchEffect } from 'vue'
import { useProduct } from '@/composables/useProduct'
import ProductDisplay from '@/components/ProductDisplay.vue'
import ProductUnavailable from '@/components/ProductUnavailable.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Product } from '@/types/product'

const productId = ref(1)
const { product, loading } = useProduct(productId)

function fetchNextProduct() {
    if (productId.value >= 20) {
        productId.value = 1
    }
    productId.value++

}

const isProductAvailable = (product: Product | null) => {
    return (
        product &&
        (product.category === "men's clothing" ||
            product.category === "women's clothing")
    )
}

// This effect watches 'loading' and 'product' and updates the <body> class
watchEffect(() => {
    const body = document.body

    // First, reset all possible theme classes
    body.classList.remove('theme-women', 'theme-unavailable')

    // Now, add the correct class based on the current state
    if (loading.value) {
        // While loading, we show the 'unavailable' (neutral grey) theme
        body.classList.add('theme-unavailable')
    } else if (isProductAvailable(product.value)) {
        // If product is available, check its category
        if (product.value?.category === "women's clothing") {
            body.classList.add('theme-women')
        }
        // No class is needed for "men's clothing" as it's the default
    } else {
        // If not loading and not available, it's an unavailable product
        body.classList.add('theme-unavailable')
    }
})
</script>

<template>
    <main class="product-view">
        <LoadingSpinner v-if="loading" />

        <ProductDisplay v-else-if="isProductAvailable(product)" :product="product!" @next-product="fetchNextProduct" />

        <ProductUnavailable v-else @next-product="fetchNextProduct" />

    </main>
</template>

<style scoped>
.product-view {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
}
</style>