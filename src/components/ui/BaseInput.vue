<template>

<input

class="base-input"

v-bind="$attrs"

/>

</template>

<script setup>
defineOptions({
    inheritAttrs:false
});
</script>

<style scoped>

.base-input{

    width:100%;

    padding:14px 18px;

    border-radius:var(--radius-md);

    border:1px solid var(--border);

    background:white;

    transition:var(--transition);

    font-size:16px;

}

.base-input:focus{

    border-color:var(--primary);

    box-shadow:0 0 0 4px rgba(37,99,235,.12);

}

</style>