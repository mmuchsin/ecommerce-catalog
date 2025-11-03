<template>
    <div class="spinner"></div>
</template>

<style scoped>
.spinner {
    width: 96px;
    height: 96px;
    border: 8px solid var(--color-grey-dark);
    border-top-color: var(--color-grey-light);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
