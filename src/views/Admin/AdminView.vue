<template>

    <div class="admin">

        <!-- Левое меню -->

        <aside class="sidebar">

            <div class="logo">

                ⚡ Servis53

                <span>Admin</span>

            </div>

            <nav>

                <button :class="{ active: currentPage === 'dashboard' }" @click="currentPage = 'dashboard'">
                    📊 Панель
                </button>

                <button :class="{ active: currentPage === 'products' }" @click="currentPage = 'products'">
                    📦 Товары
                </button>

                <button :class="{ active: currentPage === 'users' }" @click="currentPage = 'users'">
                    👥 Пользователи
                </button>

                <button :class="{ active: currentPage === 'orders' }" @click="currentPage = 'orders'">
                    🛒 Заказы
                </button>

                <button :class="{ active: currentPage === 'repair' }" @click="currentPage = 'repair'">
                    🔧 Ремонт
                </button>

                <button :class="{ active: currentPage === 'reviews' }" @click="currentPage = 'reviews'">
                    ⭐ Отзывы
                </button>

                <button :class="{ active: currentPage === 'settings' }" @click="currentPage = 'settings'">
                    ⚙ Настройки
                </button>

            </nav>

        </aside>

        <!-- Правая часть -->

        <main class="content">

            <!-- Главная -->

            <template v-if="currentPage === 'dashboard'">

                <h1>

                    Добро пожаловать 👋

                </h1>

                <p class="subtitle">

                    Панель управления Servis53

                </p>

                <div class="cards">

                    <div class="card">

                        <span>📦</span>

                        <h2>20</h2>

                        <p>Товаров</p>

                    </div>

                    <div class="card">

                        <span>👥</span>

                        <h2>12</h2>

                        <p>Пользователей</p>

                    </div>

                    <div class="card">

                        <span>🛒</span>

                        <h2>5</h2>

                        <p>Заказов</p>

                    </div>

                    <div class="card">

                        <span>🔧</span>

                        <h2>3</h2>

                        <p>Ремонтов</p>

                    </div>

                </div>

            </template>

            <!-- Товары -->

            <template v-if="currentPage === 'products'">

                <div class="page-header">

                    <h1>

                        📦 Товары

                    </h1>

                    <button class="add-btn" @click="showAddProduct = true">

                        + Добавить товар

                    </button>

                </div>

                <table class="products-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Фото</th>

                            <th>Название</th>

                            <th>Категория</th>

                            <th>Бренд</th>

                            <th>Цена</th>

                            <th></th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="product in products" :key="product.id">

                            <td>

                                {{ product.id }}

                            </td>

                            <td>

                                <img class="table-image" :src="product.images.length
                                    ? `http://localhost:5263/images/products/${product.id}/${product.images[0]}`
                                    : 'https://placehold.co/60x60?text=📦'">

                            </td>

                            <td>

                                {{ product.name }}

                            </td>

                            <td>

                                {{ product.category }}

                            </td>

                            <td>

                                {{ product.brand }}

                            </td>

                            <td>

                                {{ product.price }} ₽

                            </td>

                            <td>

                                <button class="edit">

                                    ✏️

                                </button>

                                <button class="delete" @click="deleteProduct(product.id)">

                                    🗑

                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

            <!-- Пользователи -->

            <template v-if="currentPage === 'users'">

                <h1>

                    👥 Пользователи

                </h1>

                <div class="empty">

                    Здесь будет список пользователей

                </div>

            </template>

            <!-- Заказы -->

            <template v-if="currentPage === 'orders'">

                <h1>

                    🛒 Заказы

                </h1>

                <div class="empty">

                    Здесь будут заказы

                </div>

            </template>

            <!-- Ремонт -->

            <template v-if="currentPage === 'repair'">

                <h1>

                    🔧 Ремонт

                </h1>

                <div class="empty">

                    Здесь будут ремонты

                </div>

            </template>

            <!-- Отзывы -->

            <template v-if="currentPage === 'reviews'">

                <h1>

                    ⭐ Отзывы

                </h1>

                <div class="empty">

                    Здесь будут отзывы

                </div>

            </template>

            <!-- Настройки -->

            <template v-if="currentPage === 'settings'">

                <h1>

                    ⚙ Настройки

                </h1>

                <div class="empty">

                    Здесь будут настройки

                </div>

            </template>

        </main>
        <Transition name="slide">

            <div v-if="showAddProduct" class="modal">

                <div class="modal-window">

                    <div class="modal-header">

                        <h2>

                            Новый товар

                        </h2>

                        <button class="close" @click="showAddProduct = false">

                            ✕

                        </button>

                    </div>

                    <div class="form">

                        <input v-model="form.name" placeholder="Название">

                        <textarea v-model="form.description" placeholder="Описание"></textarea>

                        <input v-model="form.price" type="number" placeholder="Цена">

                        <input v-model="form.quantity" type="number" placeholder="Количество">

                        <input v-model="form.warrantyMonths" type="number" placeholder="Гарантия (месяцев)">

                        <!-- Категория -->

                        <select v-model="form.categoryId">

                            <option disabled value="">

                                Выберите категорию

                            </option>

                            <option v-for="category in categories" :key="category.id" :value="category.id">

                                {{ category.name }}

                            </option>

                        </select>

                        <!-- Бренд -->

                        <select v-model="form.brandId">

                            <option disabled value="">

                                Выберите бренд

                            </option>

                            <option v-for="brand in brands" :key="brand.id" :value="brand.id">

                                {{ brand.name }}

                            </option>

                        </select>

                        <!-- Характеристики телефона -->

                        <template v-if="selectedCategory?.name === 'Смартфоны'">

                            <h3>

                                📱 Характеристики смартфона

                            </h3>

                            <input v-model="form.phone.screenSize" placeholder="Размер экрана">

                            <input v-model="form.phone.resolution" placeholder="Разрешение">

                            <input v-model="form.phone.processor" placeholder="Процессор">

                            <input v-model="form.phone.ram" placeholder="Оперативная память">

                            <input v-model="form.phone.storage" placeholder="Память">

                            <input v-model="form.phone.rearCamera" placeholder="Основная камера">

                            <input v-model="form.phone.frontCamera" placeholder="Фронтальная камера">

                            <input v-model="form.phone.battery" placeholder="Аккумулятор">

                            <input v-model="form.phone.operatingSystem" placeholder="Операционная система">

                            <input v-model="form.phone.simType" placeholder="SIM">

                            <input v-model="form.phone.network" placeholder="Сеть">

                        </template>

                        <!-- Фотографии -->

                        <div class="upload">

                            <label class="upload-btn">

                                📷 Выбрать фотографии

                                <input hidden type="file" multiple accept="image/*" @change="selectImages">

                            </label>

                            <div class="preview">

                                <img v-for="file in images" :key="file.name" :src="preview(file)">

                            </div>

                        </div>

                        <button class="save" @click="saveProduct">

                            Сохранить

                        </button>

                    </div>

                </div>

            </div>

        </Transition>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/api/api";


const categories = ref([]);
const brands = ref([]);
const currentPage = ref("dashboard");
const products = ref([]);
const showAddProduct = ref(false);
const images = ref([]);
const form = ref({

    name: "",

    description: "",

    price: 0,

    quantity: 1,

    warrantyMonths: 12,

    categoryId: "",

    brandId: "",

    phone: {

        screenSize: "",

        resolution: "",

        processor: "",

        ram: "",

        storage: "",

        rearCamera: "",

        frontCamera: "",

        battery: "",

        operatingSystem: "",

        simType: "",

        network: ""

    }

});

const selectedCategory = computed(() => {

    return categories.value.find(

        x => x.id == form.value.categoryId

    );

});

async function loadCategories() {

    const { data } = await api.get("/categories");

    categories.value = data;

}

async function loadBrands() {

    const { data } = await api.get("/brands");

    brands.value = data;

}

function preview(file) {

    return window.URL.createObjectURL(file);

}

function selectImages(e) {

    images.value = [...e.target.files];

}

async function loadProducts() {

    try {

        const { data } = await api.get("/products");

        // if (
        //     selectedCategory.value?.name === "Смартфоны"
        // ) {
        //     await api.post(

        //         `/products/${data.id}/phone`,

        //         form.value.phone

        //     );
        // }

        products.value = data.products;

    }
    catch (e) {

        console.error(e);

    }

}

async function saveProduct() {
    console.log("PRODUCT");
    try {

        const { data } = await api.post(
            "/products",
            form.value
        );

        // сохраняем характеристики

        if (selectedCategory.value?.name === "Смартфоны") {

            await api.post(
                `/products/${data.id}/phone`,
                form.value.phone
            );

        }

        // загружаем изображения

        if (images.value.length > 0) {

            const fd = new FormData();

            images.value.forEach(image => {

                fd.append("files", image);

            });

            await api.post(
                `/products/${data.id}/images`,
                fd
            );

        }
        console.log("SAVE PRODUCT");
    }
    catch (e) {

        console.error(e);

    }

}
async function deleteProduct(id) {

    if (!confirm("Удалить товар?"))
        return;

    await api.delete(`/products/${id}`);

    await loadProducts();

}
onMounted(() => {

    loadProducts();

    loadCategories();

    loadBrands();

});
</script>

<style scoped>
.modal {

    position: fixed;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    display: flex;

    justify-content: flex-end;

    align-items: stretch;

    background: rgba(0, 0, 0, .45);

    z-index: 99999;

}

.modal-window {

    width: 650px;

    max-width: 100%;

    height: 100vh;

    background: white;

    overflow: auto;

    padding: 35px;

    box-sizing: border-box;

}

.modal-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 30px;

}

.close {

    border: none;

    background: none;

    font-size: 28px;

    cursor: pointer;

}

.form {

    display: flex;

    flex-direction: column;

    gap: 18px;

}

.form input,

.form textarea {

    padding: 16px;

    border: 1px solid #ddd;

    border-radius: 14px;

    font-size: 16px;

}

.form textarea {

    resize: none;

    min-height: 180px;

}

.save {

    margin-top: 20px;

    padding: 18px;

    border: none;

    border-radius: 16px;

    background: #2563eb;

    color: white;

    font-size: 17px;

    cursor: pointer;

}

.slide-enter-active,

.slide-leave-active {

    transition: .35s;

}

.slide-enter-from,

.slide-leave-to {

    opacity: 0;

}

.slide-enter-from .modal-window,

.slide-leave-to .modal-window {

    transform: translateX(100%);

}

.slide-enter-to .modal-window,

.slide-leave-from .modal-window {

    transform: translateX(0);

}

.products-table {

    width: 100%;

    border-collapse: collapse;

    background: white;

    border-radius: 18px;

    overflow: hidden;

    box-shadow: 0 10px 30px rgba(0, 0, 0, .05);

}

.products-table th {

    text-align: left;

    padding: 18px;

    background: #f5f7fb;

}

.products-table td {

    padding: 18px;

    border-top: 1px solid #eee;

}

.table-image {

    width: 60px;

    height: 60px;

    object-fit: cover;

    border-radius: 12px;

}

.edit {

    margin-right: 10px;

    border: none;

    background: #2563eb;

    color: white;

    border-radius: 10px;

    padding: 10px;

    cursor: pointer;

}

.delete {

    border: none;

    background: #ef4444;

    color: white;

    border-radius: 10px;

    padding: 10px;

    cursor: pointer;

}

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 35px;

}

.add-btn {

    border: none;

    background: #2563eb;

    color: white;

    padding: 14px 26px;

    border-radius: 14px;

    cursor: pointer;

    font-size: 16px;

    transition: .3s;

}

.add-btn:hover {

    transform: translateY(-2px);

}

.empty {

    background: white;

    padding: 80px;

    border-radius: 20px;

    text-align: center;

    color: #888;

    box-shadow: 0 8px 25px rgba(0, 0, 0, .05);

}

.admin {

    display: grid;

    grid-template-columns: 260px 1fr;

    min-height: 100vh;

    background: #f4f7fb;

}

.sidebar {

    background: #111827;

    color: white;

    padding: 35px;

}

.logo {

    font-size: 28px;

    font-weight: 800;

    margin-bottom: 50px;

}

.logo span {

    color: #60a5fa;

}

nav {

    display: flex;

    flex-direction: column;

    gap: 12px;

}

nav button {

    background: none;

    border: none;

    color: #cbd5e1;

    text-align: left;

    padding: 16px;

    border-radius: 14px;

    cursor: pointer;

    font-size: 16px;

    transition: .25s;

}

nav button:hover {

    background: #1e293b;

    color: white;

}

.active {

    background: #2563eb !important;

    color: white !important;

}

.content {

    padding: 50px;

}

h1 {

    font-size: 42px;

    margin-bottom: 10px;

}

.subtitle {

    color: #777;

    margin-bottom: 45px;

}

.cards {

    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 25px;

}

.card {

    background: white;

    border-radius: 22px;

    padding: 35px;

    box-shadow: 0 10px 25px rgba(0, 0, 0, .06);

    transition: .3s;

}

.card:hover {

    transform: translateY(-6px);

}

.card span {

    font-size: 36px;

}

.card h2 {

    margin: 18px 0 5px;

    font-size: 34px;

}

.card p {

    color: #777;

}

.upload {

    margin-top: 10px;

}

.upload-btn {

    display: inline-block;

    background: #2563eb;

    color: white;

    padding: 14px 22px;

    border-radius: 12px;

    cursor: pointer;

}

.preview {

    display: flex;

    flex-wrap: wrap;

    gap: 15px;

    margin-top: 20px;

}

.preview img {

    width: 110px;

    height: 110px;

    object-fit: cover;

    border-radius: 14px;

    box-shadow: 0 5px 15px rgba(0, 0, 0, .12);

}
</style>