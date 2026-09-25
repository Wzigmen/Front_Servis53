import { defineStore } from "pinia";
import { getFavorites, addFavorite, removeFavorite } from "@/api/favorites";

// Избранное загружается один раз и общее для всех карточек товаров
export const useFavoritesStore = defineStore("favorites", {

    state: () => ({
        products: []
    }),

    getters: {
        count: state => state.products.length,
        has: state => productId => state.products.some(x => x.id === productId)
    },

    actions: {

        async load() {

            const { data } = await getFavorites();

            this.products = data;
        },

        async toggle(productId) {

            if (this.has(productId))
                await removeFavorite(productId);
            else
                await addFavorite(productId);

            await this.load();
        },

        reset() {
            this.products = [];
        }
    }
});
