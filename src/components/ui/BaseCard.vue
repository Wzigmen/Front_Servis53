<template>
    <div class="base-card">
        <slot />
    </div>
</template>

<script setup>
</script>

<style scoped>

.base-card{

    background: var(--surface);

    border-radius: var(--radius-lg);

    box-shadow: var(--shadow-sm);

    padding: 24px;

    transition: var(--transition);

    border:1px solid var(--border);

}

.base-card:hover{

    transform: translateY(-6px);

    box-shadow: var(--shadow-lg);

}

</style>