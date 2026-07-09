<template>
    <section class="hero">

        <div class="container hero-content">

            <div class="hero-left">

                <span class="badge">
                    Servis53
                </span>

                <h1>
                    Ремонт техники
                    <span>любой сложности</span>
                </h1>

                <p>
                    Ремонт телефонов, ноутбуков,
                    компьютеров и продажа техники
                    с гарантией качества.
                </p>

                <div class="buttons">

                    <button class="btn">
                        Оставить заявку
                    </button>

                    <button class="btn-outline">
                        Каталог
                    </button>

                </div>

            </div>

            <div class="hero-right">

                <HeroDevices/>

            </div>

        </div>

    </section>
</template>

<script setup>

import HeroDevices from "./HeroDevices.vue";

</script>

<style scoped>

.hero{

    min-height:85vh;

    display:flex;

    align-items:center;

}

.hero-content{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:80px;

    align-items:center;

}

.hero h1{

    font-size:64px;

    margin:20px 0;

}

.hero h1 span{

    color:var(--primary);

}

.hero p{

    font-size:20px;

    color:var(--text-light);

    margin-bottom:40px;

}

.buttons{

    display:flex;

    gap:20px;

}

.btn-outline{

    background:white;

    border:2px solid var(--primary);

    color:var(--primary);

    border-radius:14px;

    padding:15px 28px;

}

.badge{

    background:#DBEAFE;

    color:var(--primary);

    padding:8px 16px;

    border-radius:999px;

}

</style>