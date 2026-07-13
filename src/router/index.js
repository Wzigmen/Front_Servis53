import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Services from "@/views/Services.vue";
import Shop from "@/views/Shop.vue";
import Contacts from "@/views/Contacts.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import AdminView from "@/views/Admin/AdminView.vue";

import { useAuthStore } from "@/stores/auth";

// Сначала маршруты
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/services",
    name: "Services",
    component: Services,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/ProductView.vue"),
  },
];

// Потом создаем router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {

    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated)
        return "/login";

    if (
        to.meta.requiresAdmin &&
        auth.user?.role !== "Admin"
    )
    {
        return "/";
    }

});
// И только потом экспортируем
export default router;
