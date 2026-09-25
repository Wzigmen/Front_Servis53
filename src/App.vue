<template>
  <AppHeader />

  <main class="main-content">
    <router-view />
  </main>

  <AppFooter />
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>

<style>
#app {

  min-height: 100vh;

  background: transparent;

}
</style>
