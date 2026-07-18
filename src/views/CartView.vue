<template>
    <div class="cart">

        <h1>🛒 Корзина</h1>

        <div v-if="cart.items.length === 0" class="empty">

            Корзина пуста

        </div>

        <div v-else>

            <div class="cart-layout">

                <div class="cart-list">

                    <div class="cart-item" v-for="item in cart.items" :key="item.id">

                        <img :src="imageUrl(item)" class="product-image">

                        <div class="product-info">

                            <h3>

                                {{ item.name }}

                            </h3>

                            <span>

                                В наличии

                            </span>

                        </div>

                        <div class="product-price">

                            {{ item.price.toLocaleString() }} ₽

                        </div>

                        <div class="quantity">

                            <button @click="changeQuantity(item, -1)">

                                −

                            </button>

                            <span>

                                {{ item.quantity }}

                            </span>

                            <button @click="changeQuantity(item, 1)">

                                +

                            </button>

                        </div>

                        <div class="sum">

                            {{ (item.price * item.quantity).toLocaleString() }} ₽

                        </div>

                        <button class="delete" @click="remove(item)">

                            🗑

                        </button>

                    </div>

                </div>

                <div class="summary">

                    <h2>

                        Ваш заказ

                    </h2>

                    <div class="row">

                        <span>Товаров</span>

                        <b>{{ cart.items.length }}</b>

                    </div>

                    <div class="row">

                        <span>Стоимость</span>

                        <b>{{ cart.total.toLocaleString() }} ₽</b>

                    </div>

                    <div class="row">

                        <span>Доставка</span>

                        <b>Бесплатно</b>

                    </div>

                    <hr>

                    <div class="total">

                        {{ cart.total.toLocaleString() }} ₽

                    </div>

                    <button class="checkout">

                        Оформить заказ

                    </button>

                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api/api";

const cart = ref({

    items: [],

    total: 0

});

async function remove(item) {

    await api.delete(

        `/cart/${item.productId}`

    );
window.dispatchEvent(new Event("cart-updated"));
    loadCart();

}

async function changeQuantity(item, delta) {

    const quantity = item.quantity + delta;

    await api.put("/cart/update", {
        productId: item.productId,
        quantity
    });
    window.dispatchEvent(new Event("cart-updated"));
    loadCart();

}

function imageUrl(item) {

    if (!item.image)

        return "";

    return `http://localhost:5263/images/products/${item.productId}/${item.image}`;

}

async function loadCart() {

    const { data } = await api.get("/cart");

    cart.value = data;

}

onMounted(loadCart);

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
</style>
