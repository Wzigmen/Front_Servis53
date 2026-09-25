<template>
  <div class="login-page">

    <form class="login-form" @submit.prevent="loginUser">

      <h1>Вход</h1>

      <input
        v-model="form.login"
        type="text"
        placeholder="Логин"
        required
      >

      <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        required
      >

      <button :disabled="loading">
        {{ loading ? "Подождите..." : "Войти" }}
      </button>

      <p v-if="error">
        {{ error }}
      </p>

    </form>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const error = ref("");
const loading = ref(false);

const form = ref({
    login: "",
    password: ""
});

async function loginUser() {

    error.value = "";
    loading.value = true;

    try {

        await auth.login(form.value);

        // возвращаем на страницу, с которой отправили на вход
        const redirect = route.query.redirect;

        router.push(typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/");

    } catch {

        error.value = "Неверный логин или пароль";

    } finally {

        loading.value = false;

    }

}
</script>
