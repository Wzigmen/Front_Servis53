import { defineStore } from "pinia";
import { login, register, getMe } from "@/api/auth";

export const useAuthStore = defineStore("auth", {

    state: () => ({

        token: localStorage.getItem("token"),

        user: null,

        isAuthenticated: !!localStorage.getItem("token")

    }),

    actions: {

        async login(credentials) {

            const response = await login(credentials);

            this.token = response.data.token;

            localStorage.setItem("token", this.token);

            this.isAuthenticated = true;

            await this.fetchUser();
        },

        async register(data) {

            await register(data);

        },

        async fetchUser() {

            const response = await getMe();

            this.user = response.data;

        },

        logout() {

            this.token = null;

            this.user = null;

            this.isAuthenticated = false;

            localStorage.removeItem("token");

        }

    }

});