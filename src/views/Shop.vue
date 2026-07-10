<template>
    <div class="shop-page">

        <!-- Заголовок -->
        <section class="shop-header">

            <h1>
                Магазин техники
            </h1>

            <p>
                Телефоны, ноутбуки, компьютеры и аксессуары
            </p>

        </section>



        <div class="shop-container">


            <!-- Левая часть - фильтры -->
            <aside class="filters">


                <h3>
                    Фильтры
                </h3>

                <div class="filter-block">

                    <input class="search-input" placeholder="Поиск..." v-model="filters.search">

                </div>
                <div class="filter-block">

    <h4>Категории</h4>

    <div class="chips">

        <button
            class="chip"
            :class="{active:filters.categoryId===null}"
            @click="filters.categoryId=null"
        >
            Все
        </button>

        <button
            v-for="category in categories"
            :key="category.id"
            class="chip"
            :class="{active:filters.categoryId===category.id}"
            @click="filters.categoryId=category.id"
        >
            {{ category.name }}
        </button>

    </div>

</div>

                <div class="filter-block">

    <h4>Бренды</h4>

    <div class="chips">

        <button
            class="chip"
            :class="{active:filters.brandId===null}"
            @click="filters.brandId=null"
        >
            Все
        </button>

        <button
            v-for="brand in brands"
            :key="brand.id"
            class="chip"
            :class="{active:filters.brandId===brand.id}"
            @click="filters.brandId=brand.id"
        >
            {{ brand.name }}
        </button>

    </div>

</div>


                <div class="filter-block">

                    <h4>Цена</h4>

                    <input type="number" placeholder="От" v-model="filters.minPrice">

                    <input type="number" placeholder="До" v-model="filters.maxPrice">

                </div>

                <button class="filter-button reset-button" @click="resetFilters">
                    Сбросить
                </button>

            </aside>





            <!-- Правая часть -->
            <main class="products">


                <div class="products-top">


                    <h2>
                        Товары
                    </h2>



                    <select>

                        <option>
                            Популярные
                        </option>

                        <option>
                            Дешевле
                        </option>

                        <option>
                            Дороже
                        </option>

                    </select>


                </div>



                <!-- Тут потом будет ProductGrid -->

                <div class="products-grid">

                    <ProductCard v-for="product in products" :key="product.id" :product="product" />

                </div>


            </main>


        </div>


    </div>
</template>



<script setup>
import ProductCard from "@/components/shop/ProductCard.vue";
import { ref, onMounted, watch } from "vue";
import api from "@/api/api";


const products = ref([]);
const categories = ref([]);
const brands = ref([]);
const total = ref(0);
const loading = ref(false);

const filters = ref({
    search: "",
    categoryId: null,
    brandId: null,
    minPrice: null,
    maxPrice: null,
    sort: "",
    page: 1,
    pageSize: 12
});

async function loadProducts() {
    loading.value = true;
    try {
        const { data } = await api.get("/products", { params: filters.value });
        products.value = data.products;
        total.value = data.total;
    }
    catch (err) {
        console.error(err);
    }
    finally {
        loading.value = false;
    }
}

async function loadCategories() {
    try {
        const { data } = await api.get("/categories");
        categories.value = data;
    }
    catch (err) {
        console.error(err);
    }
}

async function loadBrands() {
    try {
        const { data } = await api.get("/brands");
        brands.value = data;
    }
    catch (err) {
        console.error(err);
    }
}

function resetFilters() {
    filters.value = {
        search: "",
        categoryId: null,
        brandId: null,
        minPrice: null,
        maxPrice: null,
        sort: "",
        page: 1,
        pageSize: 12
    };
}

function imageUrl(product) {
    if (!product.images || product.images.length === 0)
        return null;

    return `http://localhost:5263/images/products/${product.id}/${product.images[0]}`;
}

watch(filters, () => {
    loadProducts();
}, { deep: true });

onMounted(async () => {
    await Promise.all([
        loadCategories(),
        loadBrands()
    ]);

    await loadProducts();
});
</script>


<style scoped>
.shop-page {

    padding: 40px;

    background:transparent;

    min-height: 100vh;

}



.shop-header {

    margin-bottom: 35px;

}


.shop-header h1 {

    font-size: 36px;

    font-weight: 700;

}



.shop-header p {

    color: #777;

}




.shop-container {

    display: flex;

    gap: 30px;

}

.search-input{
    width:100%;
    padding:3px;
    border:1px solid #ddd;
    border-radius:10px;
    outline:none;
    transition:.2s;
}

.search-input:focus{
    border-color:#2563eb;
}

/* Фильтры */


.filters {

    width: 260px;

    background: white;

    padding: 25px;

    border-radius: 18px;

    height: fit-content;

}



.filters h3 {

    margin-bottom: 20px;

}



.filter-block {

    margin-bottom: 25px;

}



.filter-block h4 {

    margin-bottom: 12px;

}



.filter-block label {

    display: block;

    margin-bottom: 10px;

    cursor: pointer;

}



.filter-block input[type="number"] {

    width: 100%;

    padding: 10px;

    margin-bottom: 10px;

    border-radius: 10px;

    border: 1px solid #ddd;

}




.filter-button {

    width: 100%;

    padding: 12px;

    border: none;

    border-radius: 12px;

    background: #2563eb;

    color: white;

    cursor: pointer;

}





/* Товары */


.products {

    flex: 1;

}



.products-top {

    background: white;

    padding: 20px;

    border-radius: 18px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;

}



.products-top select {

    padding: 10px;

    border-radius: 10px;

}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 22px;
}

@media(max-width:1500px) {
    .products-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media(max-width:1100px) {
    .products-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media(max-width:700px) {
    .products-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}


.empty-products {

    background: white;

    min-height: 300px;

    border-radius: 18px;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #999;

    font-size: 20px;

}

.chips{

    display:flex;

    flex-wrap:wrap;

    gap:10px;

}

.chip{

    padding:8px 14px;

    border-radius:999px;

    border:1px solid #d8dbe2;

    background:white;

    cursor:pointer;

    transition:.25s;

    font-size:14px;

    font-weight:600;

}

.chip:hover{

    border-color:#2563eb;

    color:#2563eb;

    transform:translateY(-2px);

}

.chip.active{

    background:#2563eb;

    color:white;

    border-color:#2563eb;

    box-shadow:0 5px 18px rgba(37,99,235,.35);

}

</style>