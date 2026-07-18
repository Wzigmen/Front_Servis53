<template>
    <div class="product-page" v-if="product">

        <div class="container">

            <div class="breadcrumbs">

                Магазин /
                {{ product.category }} /
                {{ product.name }}

            </div>

            <div class="product-layout">

                <!-- Фото -->

                <div class="gallery">

                    <img class="main-image" :src="currentImage">

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
                    <div class="stock">

                        ✔ В наличии

                    </div>

                    <div class="buttons">

                        <button to="/cart" class="buy" @click="addToCart">

                            🛒 Купить сейчас

                        </button>

                        <button class="cart">

                            ❤ В избранное

                        </button>

                    </div>

                    <div class="advantages">

                        <div>🚚 Доставка завтра</div>

                        <div>🛡 Гарантия {{ product.warrantyMonths ?? 12 }} мес.</div>

                        <div>💳 Оплата при получении</div>

                    </div>

                </div>

            </div>

            <!-- Описание -->

            <div class="card">

                <h2>

                    Описание

                </h2>

                <p>

                    {{ product.description }}

                </p>

            </div>

            <!-- Характеристики -->

            <div class="card">

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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/api";

const route = useRoute();

const product = ref(null);

const currentImage = ref("");

async function load() {

    const { data } = await api.get(`/products/${route.params.id}`);

    product.value = data;

    if (data.images.length)

        currentImage.value = image(data.images[0]);

}
async function addToCart() {

    try {

        await api.post("/cart/add", {
            productId: product.value.id,
            quantity: 1
        });
        window.dispatchEvent(new Event("cart-updated"));
        alert("Товар добавлен в корзину");

    }
    catch (e) {

        console.error(e);

        console.log(e.response?.status);

        console.log(e.response?.data);

    }

}

function image(name) {

    return `http://localhost:5263/images/products/${product.value.id}/${name}`;

}

function formatPrice(price) {

    return new Intl.NumberFormat("ru-RU").format(price);

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

        .filter(x =>

            x[0] != "id" &&
            x[0] != "productId" &&
            x[0] != "product"

        )

        .map(x => ({

            name: x[0],

            value: x[1]

        }));

});

onMounted(load);
</script>

<style scoped>
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

.card {

    background: white;

    border-radius: 24px;

    padding: 35px;

    margin-top: 40px;

    box-shadow:

        0 10px 35px rgba(0, 0, 0, .05);

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