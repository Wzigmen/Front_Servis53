<template>

<div class="grid">


    <ProductCard

        v-for="product in products"

        :key="product.id"

        :product="product"

    />


</div>


</template>



<script setup>

import ProductCard from "./ProductCard.vue";


defineProps({

    products:{
        type:Array,
        default:()=>[]
    }

})


</script>



<style scoped>


.grid{

    display:grid;

    grid-template-columns:
    repeat(auto-fill,minmax(280px,1fr));

    gap:30px;

}


</style>