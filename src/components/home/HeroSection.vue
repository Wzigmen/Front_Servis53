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


                    <button class="main-btn" to="/contacts">
                        Оставить заявку
                    </button>


                    <button class="second-btn" to="/shop">
                        Каталог
                    </button>


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

.hero{

    padding:120px 0;

}


.hero-container{

    max-width:1200px;

    margin:0 auto;

    display:grid;

    grid-template-columns:1fr 1fr;

    align-items:center;

    gap:60px;

}


.hero-badge{

    display:inline-block;

    padding:8px 18px;

    background:#dbeafe;

    color:#2563eb;

    border-radius:50px;

    font-weight:500;

}



h1{

    margin-top:35px;

    font-size:64px;

    line-height:1.1;

    font-weight:800;

    color:#0f172a;

}


h1 span{

    color:#2563eb;

}


.hero-content p{

    margin-top:30px;

    font-size:18px;

    line-height:1.6;

    color:#64748b;

    max-width:520px;

}



.hero-buttons{

    display:flex;

    gap:20px;

    margin-top:40px;

}



.main-btn{

    padding:15px 30px;

    border-radius:16px;

    border:none;

    background:#2563eb;

    color:white;

    font-size:16px;

    cursor:pointer;

}



.second-btn{

    padding:15px 30px;

    border-radius:16px;

    border:2px solid #2563eb;

    background:white;

    color:#2563eb;

    font-size:16px;

    cursor:pointer;

}

</style>