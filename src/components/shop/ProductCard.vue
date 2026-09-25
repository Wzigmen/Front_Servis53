<template>
    <div class="card" ref="card" @mousemove="move" @mouseleave="leave" @click="openProduct">

        <div class="glare"></div>

        <div class="image">

            <img v-if="image" :src="image" :alt="product.name">

            <div v-else class="placeholder">
                📦
            </div>

        </div>

        <div class="info">

            <div class="brand">
                {{ product.brand }}
            </div>

            <h3>
                {{ product.name }}
            </h3>

            <div class="category">
                {{ product.category }}
            </div>

            <div class="price">
                {{ Number(product.price).toLocaleString("ru-RU") }} ₽
            </div>

            <div class="stock">

                <span v-if="inStock" class="available">
                    ● В наличии
                </span>

                <span v-else class="unavailable">
                    ● Нет в наличии
                </span>

            </div>

            <div class="actions">

                <button class="cart-btn" :disabled="!inStock" @mouseenter="enterButton" @mouseleave="leaveButton"
                    @click.stop="addToCart">

                    🛒 В корзину

                </button>

                <button class="favorite-btn" @click.stop="toggleFavorite">
                    <Heart :size="22" :fill="isFavorite ? '#ef4444' : 'none'"
                        :color="isFavorite ? '#ef4444' : '#888'" />
                </button>

            </div>
        </div>

    </div>
</template>

<script setup>
import { Heart } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import { productImageUrl, errorMessage } from "@/api/api";

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const auth = useAuthStore();
const cart = useCartStore();
const favorites = useFavoritesStore();
const router = useRouter();

const card = ref(null);
const freeze = ref(false);

const image = computed(() => productImageUrl(props.product.id, props.product.images?.[0]));

const inStock = computed(() => props.product.quantity > 0);

const isFavorite = computed(() => favorites.has(props.product.id));

async function addToCart() {

    if (!auth.isAuthenticated) {
        alert("Необходимо войти");
        return;
    }

    try {

        await cart.add(props.product.id);

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

        await favorites.toggle(props.product.id);

    }
    catch (e) {

        console.log(e.response?.status);
        console.log(e.response?.data);
        console.error(e);

    }

}

function openProduct() {
    router.push(`/product/${props.product.id}`);
}

function move() {

    if (freeze.value)
        return;

    card.value.style.transform =
        "perspective(900px) translateZ(40px) translateY(-8px)";

}

function leave() {

    freeze.value = false;

    card.value.style.transform =
        "perspective(900px) translateZ(0) translateY(0)";

}

function enterButton() {

    freeze.value = true;

    card.value.style.transform =
        "perspective(900px) translateZ(55px) translateY(-12px)";

}

function leaveButton() {
    freeze.value = false;
}
</script>

<style scoped>
.card {

    position: relative;

    overflow: hidden;

    background: white;

    border-radius: 22px;

    transition:
        transform .35s cubic-bezier(.2, .9, .2, 1),
        box-shadow .35s;

    transform-style: preserve-3d;

    box-shadow: 0 12px 35px rgba(0, 0, 0, .08);

    cursor: pointer;

}

.card:hover {

    box-shadow:
        0 35px 80px rgba(0, 0, 0, .18);

}

.glare {

    position: absolute;

    inset: 0;

    pointer-events: none;

    transition: .12s;

}

.image {

    height: 240px;

    display: flex;

    justify-content: center;

    align-items: center;

    overflow: hidden;

}

.image img {

    width: 85%;

    transition: .35s;

}

.card:hover img {

    transform: scale(1.08);

}

.placeholder {

    font-size: 90px;

}

.info {

    padding: 20px;

}

.brand {

    color: #2563eb;

    font-size: 14px;

    font-weight: 700;

}

h3 {

    margin: 10px 0;

    font-size: 22px;

    min-height: 56px;

}

.category {

    color: #777;

    margin-bottom: 18px;

}

.price {

    font-size: 28px;

    font-weight: 700;

}

.stock {

    margin: 15px 0;

}

.available {

    color: #0c9b45;

    font-weight: 600;

}

.unavailable {

    color: #94a3b8;

    font-weight: 600;

}

button {

    width: 100%;

    padding: 14px;

    border: none;

    border-radius: 14px;

    background: linear-gradient(135deg, #2563eb, #3b82f6);

    color: white;

    font-size: 16px;

    font-weight: 700;

    cursor: pointer;

    transition: .25s;

    position: relative;

    overflow: hidden;

}

.cart-btn:hover:not(:disabled) {

    background: #1e4fd8;

    transform: translateY(-2px) scale(1.03);

    box-shadow:
        0 0 15px rgba(37, 99, 235, .45),
        0 0 35px rgba(37, 99, 235, .35),
        0 0 60px rgba(37, 99, 235, .25);

    animation: glow 1.4s infinite alternate;

}

.cart-btn:disabled {

    background: #cbd5e1;

    cursor: not-allowed;

}

.actions {

    display: flex;
    gap: 10px;
    margin-top: 15px;

}

.cart-btn {

    flex: 1;

}

.favorite-btn {

    width: 56px;
    min-width: 56px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 14px;

    background: #f5f5f5;
    color: #ef4444;

    font-size: 22px;
    cursor: pointer;

    transition: .25s;

}

.favorite-btn:hover {

    background: #ffe6ea;

    transform: translateY(-2px);

}

@keyframes glow {

    from {

        box-shadow:
            0 0 15px rgba(37, 99, 235, .35),
            0 0 35px rgba(37, 99, 235, .25);

    }

    to {

        box-shadow:
            0 0 25px rgba(37, 99, 235, .75),
            0 0 55px rgba(37, 99, 235, .45);

    }

}
</style>
