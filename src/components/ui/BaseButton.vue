<template>
    <button
        class="base-button"
        :class="variant"
    >
        <slot />
    </button>
</template>


<script setup>

defineProps({

    variant: {
        type: String,
        default: "primary"
    }

})

</script>


<style scoped>

.base-button {

    padding: 14px 28px;

    border-radius: var(--radius-md);

    font-weight: 600;

    transition: var(--transition);

    display: inline-flex;

    align-items:center;

    justify-content:center;

    gap:10px;

}


/* Основная кнопка */

.primary {

    background: var(--primary);

    color:white;

}


.primary:hover {

    background:var(--primary-hover);

    transform:translateY(-2px);

}



/* Белая кнопка */

.outline {

    background:transparent;

    border:2px solid var(--primary);

    color:var(--primary);

}


.outline:hover {

    background:var(--primary);

    color:white;

}



/* Темная кнопка */

.dark {

    background:var(--text);

    color:white;

}


.dark:hover {

    opacity:.9;

}


</style>