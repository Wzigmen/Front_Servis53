<template>

    <section class="hero">

        <div class="container hero-container">


            <div class="hero-content">


                <span class="hero-badge">
                    Servis53
                </span>


                <h1>

                    Ремонт
                    <br>

                    техники <span>любой</span>

                    <br>

                    <span>сложности</span>

                </h1>



                <p>

                    Ремонт телефонов, ноутбуков,
                    компьютеров и продажа техники
                    с гарантией качества.

                </p>



                <div class="hero-buttons">


                    <RouterLink to="/shop" class="hero-btn primary">

                        Каталог

                    </RouterLink>

                    <RouterLink to="/contacts" class="hero-btn secondary">

                        Отправить заявку

                    </RouterLink>


                </div>


            </div>



            <HeroDevices />


        </div>


    </section>


</template>


<script setup>

import HeroDevices from "./HeroDevices.vue";


</script>

<style scoped>

/* =========================
        HERO
========================= */

.hero{

    padding:120px 0;

    overflow:hidden;

}

.hero-container{

    max-width:1200px;

    margin:0 auto;

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:70px;

    align-items:center;

}

.hero-badge{

    display:inline-flex;

    align-items:center;

    gap:10px;

    padding:10px 22px;

    border-radius:50px;

    background:#dbeafe;

    color:#2563eb;

    font-weight:600;

    box-shadow:0 8px 25px rgba(37,99,235,.12);

}

h1{

    margin-top:30px;

    font-size:64px;

    line-height:1.08;

    font-weight:900;

    color:#0f172a;

}

h1 span{

    color:#2563eb;

}

.hero-content p{

    margin-top:28px;

    max-width:560px;

    font-size:18px;

    line-height:1.8;

    color:#64748b;

}

/* =========================
      BUTTONS
========================= */

.hero-buttons{

    display:flex;

    gap:18px;

    margin-top:45px;

    flex-wrap:wrap;

}

.hero-btn{

    position:relative;

    overflow:hidden;

    display:inline-flex;

    justify-content:center;

    align-items:center;

    min-width:200px;

    height:56px;

    border-radius:16px;

    text-decoration:none;

    font-size:16px;

    font-weight:700;

    transition:.35s;

}

.hero-btn::before{

    content:"";

    position:absolute;

    left:-140%;

    top:0;

    width:55%;

    height:100%;

    background:linear-gradient(
        120deg,
        transparent,
        rgba(255,255,255,.95),
        transparent
    );

}

.hero-btn:hover::before{

    animation:shine .8s ease;

}

.primary{

    background:linear-gradient(135deg,#2563eb,#4f8cff);

    color:white;

    box-shadow:

        0 15px 35px rgba(37,99,235,.30);

}

.primary:hover{

    transform:translateY(-5px);

    box-shadow:

        0 0 25px rgba(59,130,246,.75),

        0 15px 45px rgba(37,99,235,.45);

}

.secondary{

    background:white;

    color:#2563eb;

    border:2px solid #2563eb;

}

.secondary:hover{

    background:#2563eb;

    color:white;

    transform:translateY(-5px);

    box-shadow:

        0 0 20px rgba(37,99,235,.45);

}
/* =========================
      ANIMATIONS
========================= */

@keyframes shine{

    from{

        left:-140%;

    }

    to{

        left:170%;

    }

}

/* =========================
        RESPONSIVE
========================= */

@media(max-width:1100px){

.hero-container{

    grid-template-columns:1fr;

    text-align:center;

}

.hero-content p{

    margin-inline:auto;

}

.hero-buttons{

    justify-content:center;

}

}

@media(max-width:768px){

h1{

    font-size:42px;

}

.hero{

    padding:70px 0;

}

.hero-btn{

    width:100%;

}

.hero-buttons{

    flex-direction:column;

}

}

@media(max-width:500px){

.hero-badge{

    font-size:14px;

}

h1{

    font-size:34px;

}

.hero-content p{

    font-size:16px;

}

}

</style>
