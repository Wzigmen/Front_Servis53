<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <router-view />
    </main>

    <LoginModal 
      v-if="showLogin" 
      @close="showLogin = false" 
    />

    <AppFooter />
  </div>
  
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import LoginModal from "@/components/auth/LoginModal.vue";
import { ref } from "vue";

const auth = useAuthStore();
const showLogin = ref(false);

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
#app {

  min-height: 100vh;

  background: transparent;

}
</style>