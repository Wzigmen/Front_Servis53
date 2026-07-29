import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "@/stores/auth";

import "./styles/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

async function bootstrap() {
    const auth = useAuthStore();

    if (auth.token) {
        try {
            await auth.fetchUser();
        }
        catch {
            auth.logout();
        }
    }
    app.mount("#app");
}

bootstrap();