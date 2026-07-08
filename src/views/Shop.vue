<template>

    <section class="shop">

        <div class="container">

            <h1>Каталог товаров</h1>

            <div class="shop-layout">

                <aside class="filters">

                    Фильтры

                </aside>


                <main class="products">

                    <div v-for="product in products" :key="product.id" class="product-card">

                        <h2>
                            {{ product.name }}
                        </h2>

                        <p>
                            {{ product.description }}
                        </p>

                        <p>
                            Бренд: {{ product.brand }}
                        </p>

                        <p>
                            Категория: {{ product.category }}
                        </p>

                        <h3>
                            {{ product.price }} ₽
                        </h3>

                    </div>

                </main>


            </div>

        </div>

    </section>

</template>


<script setup>

import { ref, onMounted } from "vue";
import api from "@/api/api";


const products = ref([]);


onMounted(async () => {

    try {

        const response = await api.get("/products");

        products.value = response.data.products;

        console.log(products.value);

        console.log(products.value[0]);

    }
    catch (error) {

        console.error(error);

    }

});


</script>


<style scoped>
.shop {

    padding: 60px 0;

}


.shop h1 {

    margin-bottom: 40px;

    font-size: 42px;

}


.shop-layout {

    display: grid;

    grid-template-columns: 300px 1fr;

    gap: 40px;

}


.filters {

    background: white;

    border-radius: 20px;

    padding: 25px;

    box-shadow: 0 10px 30px rgba(0, 0, 0, .05);

}


.products {

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 25px;

}


.product-card {

    background: white;

    padding: 20px;

    border-radius: 20px;

    box-shadow: 0 10px 30px rgba(0, 0, 0, .05);

}


.product-card img {

    width: 100%;

    height: 180px;

    object-fit: contain;

}


.product-card h3 {

    margin-top: 15px;

}


.product-card strong {

    display: block;

    margin-top: 15px;

    font-size: 22px;

    color: #2563eb;

}



@media(max-width:1100px) {

    .shop-layout {

        grid-template-columns: 1fr;

    }


    .products {

        grid-template-columns: repeat(2, 1fr);

    }

}



@media(max-width:700px) {

    .products {

        grid-template-columns: 1fr;

    }

}
</style>