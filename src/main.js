import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./styles/main.css";

const app = createApp(App);

// pinia подключается до router: guard роутера использует store авторизации
app.use(createPinia());
app.use(router);

app.mount("#app");
