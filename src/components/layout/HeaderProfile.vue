<template>
  <div class="profile">

    <RouterLink
      v-if="!auth.isAuthenticated"
      to="/login"
      class="login-btn"
    >
      <User :size="20" />
      <span>Войти</span>
    </RouterLink>

    <button
      v-else
      class="profile-btn"
    >
      <User :size="20" />

      <span>
        {{ auth.user?.fullName || auth.user?.login }}
      </span>

      <ChevronDown :size="18" />
    </button>

  </div>
</template>

<script setup>
import { User, ChevronDown } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<style scoped>

.profile{
    display:flex;
    align-items:center;
}

.login-btn,
.profile-btn{

    display:flex;
    align-items:center;
    gap:10px;

    height:48px;

    padding:0 18px;

    border-radius:999px;

    background:white;

    border:1px solid var(--border);

    color:var(--text);

    transition:var(--transition);

    font-weight:600;
}

.login-btn:hover,
.profile-btn:hover{

    color:var(--primary);

    box-shadow:var(--shadow-md);

}

</style>