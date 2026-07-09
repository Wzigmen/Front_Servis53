<template>

<section class="shop">


<div class="container">


<!-- Заголовок -->

<div class="shop-header">

    <div>

        <h1>
            Каталог техники
        </h1>

        <p>
            Телефоны, ноутбуки, компьютеры и аксессуары
        </p>

    </div>


</div>



<!-- Панель магазина -->

<div class="shop-layout">


<!-- Левая часть -->

<aside class="sidebar">


<div class="filter-placeholder">

    <h2>
        Фильтры
    </h2>


    <p>
        Здесь будут фильтры
    </p>

</div>


</aside>




<!-- Правая часть -->

<main class="products-area">



<div class="toolbar">


<span>

Найдено товаров: {{ products.length }}

</span>



<select>

<option>
Сортировка
</option>


<option>
По цене ↑
</option>


<option>
По цене ↓
</option>


</select>


</div>




<ProductGrid

:products="products"

/>



</main>


</div>



</div>


</section>


</template>



<script setup>


import {ref,onMounted} from "vue";

import axios from "axios";

import ProductGrid from "@/components/shop/ProductGrid.vue";



const products = ref([]);



const loadProducts = async()=>{


try{


const response = await axios.get(
"http://localhost:5263/api/products"
);



products.value=response.data.products;



}

catch(error){

console.log(error);

}


}



onMounted(()=>{

loadProducts();

});


</script>



<style scoped>


.shop{

padding:100px 0;

background:#f8fafc;

min-height:100vh;

}



.container{

max-width:1300px;

margin:auto;

padding:0 20px;

}



.shop-header{

margin-bottom:50px;

}



.shop-header h1{

font-size:52px;

font-weight:800;

color:#0f172a;

margin-bottom:15px;

}



.shop-header p{

font-size:18px;

color:#64748b;

}




.shop-layout{

display:grid;

grid-template-columns:300px 1fr;

gap:40px;

}




.sidebar{


position:sticky;

top:20px;

height:max-content;


}



.filter-placeholder{


background:white;

border-radius:24px;

padding:25px;

box-shadow:
0 10px 30px rgba(0,0,0,.08);

}



.filter-placeholder h2{

font-size:26px;

margin-bottom:15px;

}



.filter-placeholder p{

color:#64748b;

}





.toolbar{


background:white;

border-radius:20px;

padding:20px;

margin-bottom:30px;

display:flex;

justify-content:space-between;

align-items:center;

}



.toolbar select{


padding:10px 15px;

border-radius:12px;

border:1px solid #ddd;

}



@media(max-width:900px){


.shop-layout{

grid-template-columns:1fr;

}


.sidebar{

position:static;

}


.shop-header h1{

font-size:38px;

}


}



</style>