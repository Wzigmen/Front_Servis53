import { defineStore } from "pinia";
import { login, register, getMe } from "@/api/auth";

let userPromise = null;

export const useAuthStore = defineStore("auth", {

    state: () => ({

        token: localStorage.getItem("token"),

        user: null

    }),

    getters: {

        isAuthenticated: state => !!state.token,

        isAdmin: state => state.user?.role === "Admin"

    },

    actions: {

        async login(credentials) {

            const response = await login(credentials);

            this.token = response.data.token;

            localStorage.setItem("token", this.token);

            this.user = response.data.user;
        },

        async register(data) {

            await register(data);

        },

        async fetchUser() {

            const response = await getMe();

            this.user = response.data;

        },

        // Загружает пользователя по сохранённому токену (один раз, даже при параллельных вызовах)
        async ensureUser() {

            if (!this.token || this.user)
                return;

            userPromise ??= this.fetchUser()
                .catch(() => this.logout())
                .finally(() => { userPromise = null; });

            await userPromise;
        },

        logout() {

            this.token = null;

            this.user = null;

            localStorage.removeItem("token");

        }

    }

});
