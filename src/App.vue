<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const auth = useAuthStore();

onMounted(async () => {

    if (!auth.token)
        return;

    try {

        await auth.fetchUser();

    } catch {

        auth.logout();

    }

});
</script>

<style>
/* твои стили */
</style>