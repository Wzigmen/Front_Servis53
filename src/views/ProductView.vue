<template>
    <div class="product-page" v-if="product">

        <div class="container">

            <div class="breadcrumbs">

                <RouterLink to="/shop">Магазин</RouterLink> /
                {{ product.category }} /
                {{ product.name }}

            </div>

            <div class="product-layout">

                <!-- Фото -->

                <div class="gallery">

                    <img v-if="currentImage" class="main-image" :src="currentImage" :alt="product.name">

                    <div v-else class="main-image placeholder">📦</div>

                    <div class="thumbs">

                        <img v-for="img in product.images" :key="img" :src="image(img)"
                            @click="currentImage = image(img)" :class="{ active: currentImage === image(img) }">

                    </div>

                </div>

                <!-- Правая колонка -->

                <div class="info">

                    <div class="brand">

                        {{ product.brand }}

                    </div>

                    <h1>

                        {{ product.name }}

                    </h1>

                    <div class="price">

                        {{ formatPrice(product.price) }} ₽

                    </div>
                    <div class="credit">

                        или от

                        <b>

                            {{ formatPrice(Math.round(product.price / 24)) }}

                            ₽/мес

                        </b>

                    </div>
                    <div class="stock" :class="{ out: product.quantity <= 0 }">

                        {{ product.quantity > 0 ? `✔ В наличии: ${product.quantity} шт.` : "Нет в наличии" }}

                    </div>

                    <div class="buttons">

                        <button class="buy" :disabled="product.quantity <= 0" @click="addToCart">

                            🛒 В корзину

                        </button>

                        <button class="cart" :class="{ active: isFavorite }" @click="toggleFavorite">
                            {{ isFavorite ? "❤️ В избранном" : "🤍 В избранное" }}
                        </button>

                    </div>

                    <div class="advantages">

                        <div>🚚 Доставка завтра</div>

                        <div v-if="product.warrantyMonths">🛡 Гарантия {{ product.warrantyMonths }} мес.</div>

                        <div>💳 Оплата при получении</div>

                    </div>

                </div>

            </div>

            <!-- Описание -->

            <div class="card" v-if="product.description">

                <h2>

                    Описание

                </h2>

                <p>

                    {{ product.description }}

                </p>

            </div>

            <!-- Характеристики -->

            <div class="card" v-if="specs.length">

                <h2>

                    Характеристики

                </h2>

                <table>

                    <tbody>

                        <tr v-for="item in specs" :key="item.name">

                            <td>

                                {{ item.name }}

                            </td>

                            <td>

                                {{ item.value }}

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    <div v-else-if="notFound" class="container not-found">
        Товар не найден. <RouterLink to="/shop">Вернуться в магазин</RouterLink>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { getProduct } from "@/api/products";
import { productImageUrl, errorMessage } from "@/api/api";

const auth = useAuthStore();
const cart = useCartStore();
const favorites = useFavoritesStore();
const route = useRoute();

const product = ref(null);
const notFound = ref(false);
const currentImage = ref("");

const isFavorite = computed(() => product.value && favorites.has(product.value.id));

// Подписи характеристик (ключи приходят из PhoneSpec / LaptopSpec / PcSpec / HeadphoneSpec)
const specLabels = {
    screenSize: "Диагональ экрана",
    resolution: "Разрешение",
    processor: "Процессор",
    cpu: "Процессор",
    gpu: "Видеокарта",
    ram: "Оперативная память",
    storage: "Накопитель",
    rearCamera: "Основная камера",
    frontCamera: "Фронтальная камера",
    battery: "Аккумулятор",
    batteryLife: "Время работы",
    operatingSystem: "Операционная система",
    simType: "SIM-карта",
    network: "Сеть",
    refreshRate: "Частота обновления",
    weight: "Вес",
    motherboard: "Материнская плата",
    powerSupply: "Блок питания",
    caseName: "Корпус",
    cooling: "Охлаждение",
    headphoneType: "Тип наушников",
    wireless: "Беспроводные",
    bluetoothVersion: "Версия Bluetooth",
    noiseCanceling: "Шумоподавление",
    microphone: "Микрофон"
};

async function load() {

    if (!route.params.id)
        return;

    product.value = null;
    notFound.value = false;
    currentImage.value = "";

    try {

        const { data } = await getProduct(route.params.id);

        product.value = data;

        if (data.images.length)
            currentImage.value = image(data.images[0]);

    }
    catch (e) {

        console.error(e);

        notFound.value = true;

    }

}

async function addToCart() {

    if (!auth.isAuthenticated) {
        alert("Необходимо войти");
        return;
    }

    try {

        await cart.add(product.value.id);

        alert("Товар добавлен в корзину");

    }
    catch (e) {

        console.error(e);

        console.log(e.response?.status);

        console.log(e.response?.data);

        alert(errorMessage(e, "Не удалось добавить товар в корзину"));

    }

}

async function toggleFavorite() {

    if (!auth.isAuthenticated) {

        alert("Необходимо войти");
        return;

    }

    try {

        await favorites.toggle(product.value.id);

    }
    catch (e) {

        console.error(e);

    }

}

function image(name) {

    return productImageUrl(product.value.id, name);

}

function formatPrice(price) {

    return new Intl.NumberFormat("ru-RU").format(price);

}

function formatSpecValue(value) {

    if (value === true) return "Да";
    if (value === false) return "Нет";

    return value;
}

const specs = computed(() => {

    if (!product.value)
        return [];

    const p = product.value.phone ??
        product.value.laptop ??
        product.value.pc ??
        product.value.headphones;

    if (!p)
        return [];

    return Object.entries(p)
        .filter(([key, value]) =>
            key !== "id" &&
            key !== "productId" &&
            value !== null &&
            value !== ""
        )
        .map(([key, value]) => ({
            name: specLabels[key] ?? key,
            value: formatSpecValue(value)
        }));

});

// перезагрузка при переходе с одного товара на другой
watch(() => route.params.id, load, { immediate: true });
</script>

<style scoped>

.cart.active {

    background: #ef4444;
    border-color: #ef4444;
    color: white;

}

.cart.active:hover {

    background: #dc2626;
    border-color: #dc2626;

}
.product-page {

    padding: 40px 0;

}

.breadcrumbs {

    color: #777;

    margin-bottom: 25px;

}

.product-layout {

    display: grid;

    grid-template-columns: 540px 1fr;

    gap: 80px;

    align-items: start;

    margin-bottom: 50px;

}

.gallery {

    position: sticky;

    top: 100px;

    animation: showLeft .7s ease;

}

.info {

    animation: showRight .7s ease;

}

.main-image {

    width: 100%;

    aspect-ratio: 1;

    object-fit: contain;

    background: white;

    border-radius: 26px;

    padding: 30px;

    box-shadow:

        0 15px 45px rgba(0, 0, 0, .08);

    transition: .35s;

}

.main-image:hover {

    transform: scale(1.02);

}

.thumbs {

    display: flex;

    gap: 15px;

    margin-top: 20px;

}

.thumbs img {

    width: 90px;

    height: 90px;

    object-fit: contain;

    border-radius: 15px;

    cursor: pointer;

    background: white;

    border: 2px solid transparent;

}

.active {

    border-color: #2563eb;

}

.brand {

    display: inline-block;

    background: #eef5ff;

    color: #2563eb;

    padding: 8px 18px;

    border-radius: 999px;

    font-weight: 700;

}

h1 {

    margin: 20px 0;

    font-size: 48px;

    line-height: 1.2;

}

.price {

    font-size: 54px;

    font-weight: 900;

    color: #111;

    margin-top: 30px;

}

.stock {

    display: inline-block;

    margin-top: 25px;

    background: #e9fff1;

    color: #16a34a;

    padding: 10px 18px;

    border-radius: 999px;

    font-weight: 700;

}

.buttons {

    display: flex;

    gap: 18px;

    margin-top: 35px;

}

.buy,
.cart {

    flex: 1;

    padding: 18px;

    border: none;

    border-radius: 16px;

    cursor: pointer;

    font-size: 18px;

}

.buy {

    flex: 1;

    border: none;

    border-radius: 18px;

    background: linear-gradient(135deg, #2563eb, #3b82f6);

    color: white;

    font-size: 18px;

    font-weight: 700;

    cursor: pointer;

    padding: 18px;

    transition: .35s;

}

.buy:hover {

    transform: translateY(-4px);

    box-shadow:

        0 15px 35px rgba(37, 99, 235, .35);

}

.cart {

    flex: 1;

    border: 2px solid #2563eb;

    background: white;

    color: #2563eb;

    border-radius: 18px;

    cursor: pointer;

    font-size: 18px;

    font-weight: 700;

    transition: .35s;

}

.cart:hover {

    background: #2563eb;

    color: white;

}

.card {

    background: white;

    border-radius: 24px;

    padding: 35px;

    margin-top: 40px;

    box-shadow:

        0 10px 35px rgba(0, 0, 0, .05);

}

.credit {

    margin-top: 10px;

    color: #777;

    font-size: 18px;

}

table {

    width: 100%;

    border-collapse: collapse;

}

td {

    padding: 10px 0;

    border-bottom: 1px solid #f1f5f9;

}

.stock.out {

    background: #f1f5f9;

    color: #64748b;

}

.buy:disabled {

    background: #cbd5e1;

    cursor: not-allowed;

    transform: none;

    box-shadow: none;

}

.placeholder {

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 120px;

}

.breadcrumbs a {

    color: #2563eb;

}

.not-found {

    padding: 80px 0;

    text-align: center;

    font-size: 20px;

}

.not-found a {

    color: #2563eb;

}

td:first-child {

    color: #666;

    width: 320px;

}

@keyframes showLeft {

    from {

        opacity: 0;

        transform: translateX(-60px);

    }

    to {

        opacity: 1;

        transform: none;

    }

}

@keyframes showRight {

    from {

        opacity: 0;

        transform: translateX(60px);

    }

    to {

        opacity: 1;

        transform: none;

    }

}
</style>
