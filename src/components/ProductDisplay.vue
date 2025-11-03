<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/product'

const props = defineProps<{
    product: Product
}>()

const emit = defineEmits(['next-product'])

const themeClass = computed(() => {
    if (props.product.category === "women's clothing") {
        return 'theme-women'
    }
    return 'theme-men'
})

const roundedRating = computed(() => {
    return Math.round(props.product.rating.rate)
})
</script>

<template>
    <div class="product-card" :class="themeClass">
        <div class="product-image">
            <img :src="product.image" :alt="product.title" />
        </div>

        <div class="product-details">
            <h1 class="title">{{ product.title }}</h1>

            <div class="product-meta">
                <div class="category">{{ product.category }}</div>
                <div class="rating" v-if="product.rating">
                    <span class="rating-text">{{ product.rating.rate }}/5</span>
                    <div class="rating-circles">
                        <span v-for="i in 5" :key="i" class="circle" :class="{ 'filled': i <= roundedRating }"></span>
                    </div>
                </div>
            </div>

            <hr class="divider" />

            <p class="description">{{ product.description }}</p>



            <hr class="divider" />

            <p class="price">${{ product.price }}</p>

            <div class="buttons">
                <button class="buy-button">Buy now</button>
                <button class="next-button" @click="emit('next-product')">
                    Next product
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- Layout & Structure --- */
.product-card {
    width: 100%;
    max-width: 800px;
    height: 450px;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: var(--bg-card);
}

.product-image {
    width: 40%;
    padding: 20px;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.product-details {
    width: 60%;
    padding: 30px;
    display: flex;
    flex-direction: column;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

/* --- Typography & Content --- */

.title {
    font-size: 18px;
    font-weight: 800;
    margin-top: 0;

    color: var(--theme-color-primary);
}

.category {
    flex: 1;
}

.description {
    font-size: 16px;
    flex-grow: 1;
    overflow-y: auto;
    min-height: 0;
    padding-top: 10px;
    padding-right: 10px;
    color: var(--text-secondary);
}

.rating {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    /* Space between text and circles */
    font-size: 16px;

    color: var(--text-secondary);
    margin-top: 10px;

}

.rating-circles {
    display: flex;
    gap: 5px;
}

.circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s ease;

    /* Empty state: uses the light grey border color */
    background-color: var(--border-main);
}

.circle.filled {
    /* Filled state: uses the primary theme color (blue or magenta) */
    background-color: var(--theme-color-primary);
}

.price {
    font-family: 'Manrope', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--theme-color-primary);
    padding-top: 10px;
}

.divider {
    border: none;
    margin: 4px 0;
    border-bottom: 1px solid var(--border-main);
}

/* --- Buttons --- */
.buttons {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    flex-shrink: 0;
}

.buy-button,
.next-button {
    width: 100%;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 600;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* "Buy Now" is the primary button */
.buy-button {
    background-color: var(--theme-color-primary);
    color: var(--theme-color-text-on-primary);
    border: 1px solid var(--theme-color-primary);
}

/* "Next Product" is the secondary/outline button */
.next-button {
    background-color: var(--bg-card);
    color: var(--theme-color-primary);
    border: 1px solid var(--theme-color-secondary-border);
}

.next-button:hover {
    background-color: var(--theme-color-bg);
}
</style>