<template>

    <div class="filter">


        <h2>
            Фильтры
        </h2>


        <div class="filter-block">


            <h3>
                Поиск
            </h3>


            <input v-model="filters.search" placeholder="Название товара" />


        </div>




        <div class="filter-block">


            <h3>
                Категория
            </h3>


            <select v-model="filters.category">


                <option value="">
                    Все категории
                </option>


                <option v-for="category in categories" :key="category.id" :value="category.id">

                    {{ category.name }}

                </option>


            </select>


        </div>




        <div class="filter-block">


            <h3>
                Цена
            </h3>


            <div class="price">


                <input type="number" v-model="filters.minPrice" placeholder="От" />


                <input type="number" v-model="filters.maxPrice" placeholder="До" />


            </div>


        </div>




        <button @click="apply">

            Применить

        </button>


        <button class="reset" @click="reset">

            Сбросить

        </button>


    </div>


</template>



<script setup>


import { reactive } from "vue";


const emit = defineEmits([
    "filter"
]);



const props = defineProps({

    categories: {
        type: Array,
        default: () => []
    }

});



const filters = reactive({

    search: "",

    category: "",

    minPrice: "",

    maxPrice: ""

});



function apply() {

    emit(
        "filter",
        { ...filters }
    )

}



function reset() {


    filters.search = "";

    filters.category = "";

    filters.minPrice = "";

    filters.maxPrice = "";


    emit(
        "filter",
        { ...filters }
    )


}


</script>



<style scoped>
.filter {

    background: white;

    border-radius: 24px;

    padding: 25px;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, .08);

}



h2 {

    font-size: 28px;

    margin-bottom: 25px;

}



.filter-block {

    margin-bottom: 25px;

}



h3 {

    font-size: 16px;

    margin-bottom: 10px;

}



input,
select {

    width: 100%;

    padding: 12px;

    border-radius: 12px;

    border: 1px solid #ddd;

}



.price {

    display: flex;

    gap: 10px;

}



button {

    width: 100%;

    padding: 14px;

    border: none;

    border-radius: 14px;

    background: #2563eb;

    color: white;

    cursor: pointer;

    margin-top: 10px;

}



.reset {

    background: #e2e8f0;

    color: #334155;

}
</style>