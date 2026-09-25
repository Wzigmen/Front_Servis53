<template>
    <div class="cart container">

        <h1>🛒 Корзина</h1>

        <div v-if="cart.items.length === 0" class="empty">

            Корзина пуста.
            <RouterLink to="/shop">Перейти в магазин</RouterLink>

        </div>

        <div v-else class="cart-layout">

            <div class="cart-list">

                <div class="cart-item" v-for="item in cart.items" :key="item.id">

                    <img v-if="item.image" :src="productImageUrl(item.productId, item.image)" class="product-image">
                    <div v-else class="product-image placeholder">📦</div>

                    <div class="product-info">

                        <RouterLink :to="`/product/${item.productId}`">
                            <h3>{{ item.name }}</h3>
                        </RouterLink>

                    </div>

                    <div class="product-price">

                        {{ formatPrice(item.price) }} ₽

                    </div>

                    <div class="quantity">

                        <button :disabled="busy" @click="changeQuantity(item, -1)">−</button>

                        <span>{{ item.quantity }}</span>

                        <button :disabled="busy" @click="changeQuantity(item, 1)">+</button>

                    </div>

                    <div class="sum">

                        {{ formatPrice(item.price * item.quantity) }} ₽

                    </div>

                    <button class="delete" :disabled="busy" @click="remove(item)">🗑</button>

                </div>

            </div>

            <div class="summary">

                <h2>Ваш заказ</h2>

                <div class="row">

                    <span>Товаров</span>

                    <b>{{ cart.count }}</b>

                </div>

                <div class="row">

                    <span>Стоимость</span>

                    <b>{{ formatPrice(cart.total) }} ₽</b>

                </div>

                <div class="row">

                    <span>Доставка</span>

                    <b>Бесплатно</b>

                </div>

                <hr>

                <div class="total">

                    {{ formatPrice(cart.total) }} ₽

                </div>

                <button class="checkout" :disabled="busy" @click="checkout">

                    Оформить заказ

                </button>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { productImageUrl, errorMessage } from "@/api/api";

const cart = useCartStore();
const busy = ref(false);

// Все действия с корзиной: блокируем кнопки и показываем ошибку сервера
async function run(action, fallback) {

    busy.value = true;

    try {
        await action();
    }
    catch (e) {

        console.error(e);

        alert(errorMessage(e, fallback));

    }
    finally {
        busy.value = false;
    }
}

function checkout() {

    return run(async () => {

        const order = await cart.checkout();

        alert(`Заказ №${order.id} успешно оформлен!`);

    }, "Ошибка оформления заказа");

}

function remove(item) {
    return run(() => cart.remove(item.productId), "Не удалось удалить товар");
}

function changeQuantity(item, delta) {
    return run(() => cart.setQuantity(item.productId, item.quantity + delta), "Не удалось изменить количество");
}

function formatPrice(price) {
    return Number(price).toLocaleString("ru-RU");
}

onMounted(() => run(() => cart.load(), "Не удалось загрузить корзину"));
</script>

<style scoped>
.cart-layout {

    display: grid;

    grid-template-columns: 1fr 320px;

    gap: 30px;

    align-items: start;

}

.cart-list {

    display: flex;

    flex-direction: column;

    gap: 18px;

}

.cart-item {

    display: grid;

    grid-template-columns: 120px 1fr 150px 150px 150px 60px;

    align-items: center;

    gap: 20px;

    padding: 20px;

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

}

.product-image {

    width: 90px;

    height: 90px;

    object-fit: contain;

}

.product-info h3 {

    margin: 0;

    font-size: 18px;

}

.product-info span {

    color: #22c55e;

    font-size: 14px;

}

.product-price {

    font-size: 18px;

    font-weight: 600;

}

.quantity {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 10px;

}

.quantity button {

    width: 34px;

    height: 34px;

    border: 1px solid #ddd;

    background: white;

    cursor: pointer;

    border-radius: 6px;

}

.sum {

    font-weight: 700;

}

.delete {

    width: 40px;

    height: 40px;

    border: none;

    background: #ef4444;

    color: white;

    border-radius: 8px;

    cursor: pointer;

}

.summary {

    position: sticky;

    top: 100px;

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 25px;

}

.summary h2 {

    margin-top: 0;

}

.row {

    display: flex;

    justify-content: space-between;

    margin: 15px 0;

}

.total {

    font-size: 28px;

    font-weight: 700;

    margin: 25px 0;

}

.checkout {

    width: 100%;

    padding: 16px;

    border: none;

    background: #2563eb;

    color: white;

    border-radius: 8px;

    font-size: 16px;

    cursor: pointer;

}

.cart {

    padding: 40px 0;

}

.cart h1 {

    margin-bottom: 30px;

}

.empty {

    padding: 60px;

    text-align: center;

    font-size: 20px;

    background: white;

    border-radius: 10px;

}

.empty a,
.product-info a {

    color: #2563eb;

}

.placeholder {

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 48px;

}

.cart button:disabled {

    opacity: .5;

    cursor: wait;

}
</style>
