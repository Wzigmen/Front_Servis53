<template>

    <div class="favorites-page">

        <div class="container">

            <h1>❤️ Избранное</h1>

            <div v-if="favorites.length === 0" class="empty">

                <div class="empty-icon">
                    ❤️
                </div>

                <h2>В избранном пока пусто</h2>

                <p>
                    Добавляйте понравившиеся товары, чтобы не потерять их.
                </p>

                <RouterLink to="/shop" class="shop-btn">

                    Перейти в магазин

                </RouterLink>

            </div>

            <div class="products-grid">

                <ProductCard v-for="product in visibleFavorites" :key="product.id" :product="product" />

            </div>
            <button v-if="visibleCount < favorites.length" class="load-more" @click="loadMore">
                Показать ещё
            </button>

        </div>

    </div>

</template>

<script setup>
import ProductCard from "@/components/shop/ProductCard.vue";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import api from "@/api/api";

const auth = useAuthStore();

const favorites = ref([]);

const visibleCount = ref(12);

const visibleFavorites = computed(() =>
    favorites.value.slice(0, visibleCount.value)
);

function loadMore() {
    visibleCount.value += 12;
}
async function loadFavorites() {

    if (!auth.user)
        return;

    const { data } = await api.get(`/favorites/${auth.user.id}`);

    favorites.value = data;
}

async function removeFavorite(productId) {

    await api.delete(
        `/favorites/${auth.user.id}/${productId}`
    );

    await loadFavorites();

    window.dispatchEvent(new Event("favorites-updated"));

}
watch(
    () => auth.user,
    (user) => {
        if (user) {
            loadFavorites();
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.load-more {
    margin: 50px auto 0;
    display: block;

    padding: 14px 35px;

    border: none;
    border-radius: 15px;

    background: #2563eb;
    color: white;

    font-size: 17px;
    font-weight: 700;

    cursor: pointer;
    transition: .25s;
}

.load-more:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, .35);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(280px, 1fr));
    gap: 28px;
    margin-top: 40px;
}

@media (max-width: 1100px) {
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 700px) {
    .products-grid {
        grid-template-columns: 1fr;
    }
}

.empty {
    margin: 80px auto;
    max-width: 500px;
    text-align: center;
    background: #fff;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .08);
}

.empty-icon {
    font-size: 70px;
    margin-bottom: 15px;
}

.empty h2 {
    margin-bottom: 10px;
}

.empty p {
    color: #777;
    margin-bottom: 30px;
}

.shop-btn {
    display: inline-block;
    padding: 14px 28px;
    background: #0d6efd;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition: .2s;
}

.shop-btn:hover {
    background: #0b5ed7;
    transform: translateY(-2px);
}

.favorites-page {

    max-width: 1100px;

    margin: auto;

    padding: 40px;

}

.favorite-card {

    display: flex;

    align-items: center;

    gap: 30px;

    background: white;

    border-radius: 18px;

    padding: 20px;

    margin-bottom: 20px;

    box-shadow: 0 6px 20px rgba(0, 0, 0, .08);

}

.favorite-card img {

    width: 120px;

    height: 120px;

    object-fit: contain;

}

.info {

    flex: 1;

}

.buttons {

    display: flex;

    flex-direction: column;

    gap: 10px;

}

.buttons button {

    padding: 12px 18px;

    border: none;

    border-radius: 10px;

    cursor: pointer;

}

.delete {

    background: #ff4b4b;

    color: white;

}

.empty {

    text-align: center;

    padding: 80px;

    font-size: 22px;

}
</style>