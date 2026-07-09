<template>
  <Transition name="slide">
    <div v-if="open" class="overlay" @click="$emit('close')">

      <aside
        class="menu"
        @click.stop
      >

        <RouterLink to="/" @click="$emit('close')">
          Главная
        </RouterLink>

        <RouterLink to="/services" @click="$emit('close')">
          Услуги
        </RouterLink>

        <RouterLink to="/shop" @click="$emit('close')">
          Магазин
        </RouterLink>

        <RouterLink to="/contacts" @click="$emit('close')">
          Контакты
        </RouterLink>

        <hr>

        <RouterLink to="/profile" @click="$emit('close')">
          Профиль
        </RouterLink>

      </aside>

    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open: Boolean
})

defineEmits(["close"])
</script>

<style scoped>

.overlay{

position:fixed;

inset:0;

background:rgba(0,0,0,.35);

z-index:5000;

}

.menu{

position:absolute;

right:0;

top:0;

width:300px;

height:100%;

background:white;

display:flex;

flex-direction:column;

padding:30px;

gap:20px;

}

a{

font-size:18px;

font-weight:600;

}

.slide-enter-active,
.slide-leave-active{

transition:.35s;

}

.slide-enter-from .menu,
.slide-leave-to .menu{

transform:translateX(100%);

}

</style>