<template>

<button class="icon-button">

    <Heart :size="22"/>

    <span class="badge">

        0

    </span>

</button>

</template>

<script setup>

import { Heart } from "lucide-vue-next";

</script>

<style scoped>

.icon-button{

position:relative;

width:48px;

height:48px;

display:flex;

justify-content:center;

align-items:center;

border-radius:50%;

background:white;

border:1px solid var(--border);

transition:var(--transition);

}

.icon-button:hover{

transform:translateY(-2px);

box-shadow:var(--shadow-md);

color:var(--primary);

}

.badge{

position:absolute;

top:-4px;

right:-4px;

width:20px;

height:20px;

border-radius:50%;

background:#ef4444;

color:white;

display:flex;

justify-content:center;

align-items:center;

font-size:11px;

font-weight:700;

}

</style>