import { defineStore } from "pinia";
import { getCart, addToCart, updateCartItem, removeFromCart } from "@/api/cart";
import { checkout } from "@/api/orders";

export const useCartStore = defineStore("cart", {

    state: () => ({
        items: [],
        total: 0
    }),

    getters: {
        count: state => state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    actions: {

        async load() {

            const { data } = await getCart();

            this.items = data.items;
            this.total = data.total;
        },

        async add(productId, quantity = 1) {

            await addToCart(productId, quantity);
            await this.load();
        },

        async setQuantity(productId, quantity) {

            await updateCartItem(productId, quantity);
            await this.load();
        },

        async remove(productId) {

            await removeFromCart(productId);
            await this.load();
        },

        async checkout() {

            const { data } = await checkout();

            await this.load();

            return data;
        },

        reset() {
            this.items = [];
            this.total = 0;
        }
    }
});
