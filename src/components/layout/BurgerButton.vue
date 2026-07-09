<template>
  <button class="burger" @click="$emit('toggle')">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script setup>
defineEmits(["toggle"]);
</script>

<style scoped>
.burger {
  width: 46px;
  height: 46px;

  display: none;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);

  transition: var(--transition);
}

.burger:hover {
  box-shadow: var(--shadow-md);
}

.burger span {
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 10px;
}

@media (max-width: 992px) {
  .burger {
    display: flex;
  }
}
</style>