<template>

<div class="search">

    <Search :size="18"/>

    <input
        type="text"
        placeholder="Поиск товаров..."
    >

</div>

</template>

<script setup>
import { Search } from "lucide-vue-next";
</script>

<style scoped>

.search{

    display:flex;

    align-items:center;

    gap:12px;

    width:260px;

    padding:12px 18px;

    border-radius:999px;

    background:white;

    border:1px solid var(--border);

}

.search input{

    flex:1;

    border:none;

    background:none;

}

@media(max-width:992px){

.search{

display:none;

}

}
</style>