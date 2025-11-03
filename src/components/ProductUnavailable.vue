<script setup lang="ts">
// No changes needed here
import sadFace from '@/assets/img/sad-face.svg';

const emit = defineEmits(['next-product']);
</script>

<template>
    <div class="unavailable-card">
        <div class="content-wrapper">
            <p class="message">This product is unavailable to show</p>
            <button class="next-button" @click="emit('next-product')">
                Next product
            </button>
        </div>
    </div>
</template>

<style scoped>
.unavailable-card {
    /* --- Card Size & Shape --- */
    /* Matches the main product card */
    width: 800px;
    height: 450px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    /* --- Backgrounds --- */
    /* Use the CSS variable for white */
    background-color: var(--bg-card);

    /* SVG background */
    background-image: url('@/assets/img/sad-face.svg');
    background-size: 600px;
    background-repeat: no-repeat;
    background-position: center;

    /* --- Content Centering --- */
    /* This centers the .content-wrapper */
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-wrapper {
    /* Ensures content is above the background SVG */
    position: relative;
    z-index: 1;

    text-align: center;
    width: 100%;
    max-width: 350px;
    /* Constrains the button width to match design */
}

.message {
    font-family: var(--font-family-main);
    font-size: 20px;
    margin-bottom: 12px;
    /* Space between text and button */

    color: var(--text-main);
}

.next-button {
    width: 100%;
    /* Match padding of other buttons */
    padding: 4px 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    /* --- Use CSS Variables --- */
    font-family: var(--font-family-main);
    font-size: 16px;
    font-weight: 600;

    /* Use variables for a neutral outline button */
    color: var(--text-secondary);
    border: 3px solid var(--text-secondary);
    background-color: var(--bg-card);
    /* White */
}

.next-button:hover {
    /* * This uses the theme's background color.
     * In app.vue, .theme-unavailable sets this
     * variable to #F0F2F5 (the light grey)
    */
    background-color: var(--theme-color-bg);
}
</style>