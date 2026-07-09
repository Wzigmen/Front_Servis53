<template>
  <div class="login-page">

    <form class="login-form" @submit.prevent="loginUser">

      <h1>Вход</h1>

      <input
        v-model="form.login"
        type="text"
        placeholder="Логин"
      >

      <input
        v-model="form.password"
        type="password"
        placeholder="Пароль"
      >

      <button>
        Войти
      </button>

      <p v-if="error">
        {{ error }}
      </p>

    </form>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const error = ref("");

const form = ref({
    login: "",
    password: ""
});

async function loginUser() {

    error.value = "";

    try {

        await auth.login(form.value);

        router.push("/");

    } catch {

        error.value = "Неверный логин или пароль";

    }

}
</script>