import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Services from "@/views/Services.vue";
import Shop from "@/views/Shop.vue";
import Contacts from "@/views/Contacts.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import CartView from "@/views/CartView.vue";
import Favorites from "@/views/Favorites.vue";

import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/services",
    name: "Services",
    component: Services
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin/AdminView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("@/views/ProductView.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
    meta: { requiresAuth: true }
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {

  const auth = useAuthStore();

  // при первом заходе пользователь ещё не загружен — дожидаемся его,
  // иначе проверка роли для /admin всегда бы не проходила
  await auth.ensureUser();

  if (to.meta.requiresAuth && !auth.isAuthenticated)
    return { path: "/login", query: { redirect: to.fullPath } };

  if (to.meta.requiresAdmin && !auth.isAdmin)
    return "/";
});

export default router;
