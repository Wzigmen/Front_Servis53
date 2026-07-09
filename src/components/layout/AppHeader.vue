<template>

    <header class="header">

        <div class="container header-container">

            <HeaderLogo />

            <div class="desktop">

                <HeaderNav />

                <HeaderSearch />

                <HeaderActions />

            </div>

            <BurgerButton @toggle="menuOpen = true" />

        </div>

    </header>

    <MobileMenu :open="menuOpen" @close="menuOpen = false" />

</template>

<script setup>

import { ref } from "vue";

import HeaderLogo from "./HeaderLogo.vue";
import HeaderNav from "./HeaderNav.vue";
import HeaderSearch from "./HeaderSearch.vue";
import HeaderActions from "./HeaderActions.vue";

import BurgerButton from "./BurgerButton.vue";
import MobileMenu from "./MobileMenu.vue";

const menuOpen = ref(false);

</script>

<style scoped>
.header {

    position: sticky;

    top: 0;

    z-index: 1000;

    background: rgba(255, 255, 255, .9);

    backdrop-filter: blur(18px);

    border-bottom: 1px solid var(--border);

}

.header-container {
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.desktop {

    display: flex;

    align-items: center;

    gap: 30px;

}

@media(max-width:992px) {

    .desktop {

        display: none;

    }

}
</style>