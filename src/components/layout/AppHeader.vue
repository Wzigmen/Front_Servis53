<template>
    <header class="header" :class="{ scrolled: isScrolled }">
        <div class="container header-container">

            <!-- Логотип -->
            <RouterLink to="/" class="logo">
                <span class="logo-icon">⚡</span>
                <span class="logo-text">Servis53</span>
            </RouterLink>
            <RouterLink v-if="auth.user?.role === 'Admin'" to="/admin" class="admin-btn">

                Админ

            </RouterLink>
            <!-- Навигация -->
            <nav class="nav">
                <RouterLink to="/">Главная</RouterLink>
                <RouterLink to="/services">Услуги</RouterLink>
                <RouterLink to="/shop">Магазин</RouterLink>
                <RouterLink to="/contacts">Контакты</RouterLink>
            </nav>

            <!-- Правая часть -->
            <div class="actions">

                <button class="icon-btn">
                    <Search :size="20" />
                </button>

                <button class="icon-btn">
                    <Heart :size="20" />
                </button>

                <button class="icon-btn">
                    <ShoppingCart :size="20" />
                </button>

                <button v-if="!auth.isAuthenticated" class="login-btn" @click="showLogin = true">

                    Войти

                </button>

                <RouterLink v-else to="/profile" class="profile-btn">
                    <User :size="18" />
                    {{ auth.user?.fullName }}
                </RouterLink>

            </div>
        </div>
    </header>
    <LoginModal v-if="showLogin" @close="showLogin = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Search, Heart, ShoppingCart, User } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import LoginModal from "@/components/auth/LoginModal.vue";

const auth = useAuthStore();
const showLogin = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 40;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.admin-btn{

    padding:12px 22px;

    border-radius:14px;

    background:#111827;

    color:white;

    font-weight:700;

    transition:.3s;

}

.admin-btn:hover{

    transform:translateY(-2px);

}

.header {

    position: sticky;
    top: 0;

    z-index: 1000;

    background: rgba(255, 255, 255, .85);

    backdrop-filter: blur(18px);

    border-bottom: 1px solid var(--border);

}

.header-container {

    display: flex;

    align-items: center;

    justify-content: space-between;

    height: 80px;

}

.logo {

    display: flex;

    align-items: center;

    gap: 10px;

    font-size: 24px;

    font-weight: 800;

}

.logo-icon {

    color: var(--primary);

}

.logo-text {

    color: var(--text);

}

.nav {

    display: flex;

    gap: 36px;

}

.nav a {

    position: relative;

    color: var(--text-light);

    font-weight: 500;

    transition: .3s;

}

.nav a::after {

    content: "";

    position: absolute;

    left: 0;

    bottom: -8px;

    width: 0;

    height: 3px;

    border-radius: 999px;

    background: var(--primary);

    transition: .3s;

}

.nav a:hover {

    color: var(--text);

}

.nav a:hover::after {

    width: 100%;

}

.router-link-active {

    color: var(--primary) !important;

}

.router-link-active::after {

    width: 100% !important;

}

.actions {

    display: flex;

    align-items: center;

    gap: 12px;

}

.icon-btn {

    width: 42px;

    height: 42px;

    border-radius: 50%;

    background: white;

    border: 1px solid var(--border);

    display: flex;

    align-items: center;

    justify-content: center;

    transition: .3s;

}

.icon-btn:hover {

    transform: translateY(-2px);

    box-shadow: var(--shadow-sm);

}

.login-btn {

    padding: 12px 26px;

    border: none;

    border-radius: 999px;

    background: linear-gradient(135deg, #2563eb, #4f8cff);

    color: white;

    font-weight: 700;

    cursor: pointer;

    transition: .3s;

}

.login-btn:hover {

    transform: translateY(-2px);

    box-shadow: 0 15px 35px rgba(37, 99, 235, .35);

}

.profile-btn {

    display: flex;

    align-items: center;

    gap: 8px;

    padding: 10px 18px;

    border-radius: 999px;

    background: white;

    border: 1px solid var(--border);

}

.header {
    transition: all .35s ease;
}

.header-container {
    transition: all .35s ease;
}

.logo {
    transition: all .35s ease;
}

.scrolled {

    background: rgba(255, 255, 255, .96);

    box-shadow: 0 10px 40px rgba(0, 0, 0, .08);

}

.scrolled .header-container {

    height: 64px;

}

.scrolled .logo {

    font-size: 21px;

}
</style>