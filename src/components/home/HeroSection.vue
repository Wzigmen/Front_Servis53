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

                        Католог

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
     SUBMIT BUTTON
========================= */

.submit-btn{

    position:relative;

    overflow:hidden;

    width:100%;

    height:58px;

    border:none;

    border-radius:18px;

    background:linear-gradient(135deg,#2563eb,#4f8cff);

    color:white;

    font-size:17px;

    font-weight:700;

    cursor:pointer;

    transition:.35s;

    animation:pulse 2.2s infinite;

}

.submit-btn:hover{

    transform:translateY(-4px);

    box-shadow:

        0 0 25px rgba(37,99,235,.9),

        0 0 60px rgba(37,99,235,.35),

        0 15px 45px rgba(37,99,235,.35);

}

.submit-btn:active{

    transform:scale(.98);

}

.submit-btn::before{

    content:"";

    position:absolute;

    left:-140%;

    top:0;

    width:60%;

    height:100%;

    background:linear-gradient(
        120deg,
        transparent,
        rgba(255,255,255,.95),
        transparent
    );

}

.submit-btn:hover::before{

    animation:shine .8s ease;

}

/* =========================
      HERO IMAGE
========================= */

.hero-image{

    display:flex;

    justify-content:center;

    align-items:center;

}

.hero-image img{

    width:100%;

    max-width:550px;

    border-radius:30px;

    box-shadow:

        0 35px 70px rgba(0,0,0,.12);

    transition:.4s;

}

.hero-image img:hover{

    transform:translateY(-10px) scale(1.02);

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

@keyframes pulse{

    0%{

        box-shadow:

            0 0 10px rgba(37,99,235,.25);

    }

    50%{

        box-shadow:

            0 0 25px rgba(37,99,235,.55),

            0 0 55px rgba(37,99,235,.25);

    }

    100%{

        box-shadow:

            0 0 10px rgba(37,99,235,.25);

    }

}
/* =========================
        ADVANTAGES
========================= */

.features{

    padding:90px 0;

}

.features-grid{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:28px;

}

.feature-card{

    background:white;

    padding:35px;

    border-radius:22px;

    transition:.35s;

    box-shadow:0 12px 35px rgba(0,0,0,.06);

}

.feature-card:hover{

    transform:translateY(-8px);

    box-shadow:0 25px 60px rgba(37,99,235,.15);

}

.feature-icon{

    width:70px;

    height:70px;

    border-radius:20px;

    background:#dbeafe;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:32px;

    margin-bottom:20px;

}

.feature-card h3{

    font-size:22px;

    margin-bottom:12px;

}

.feature-card p{

    color:#64748b;

    line-height:1.7;

}

/* =========================
      SECTION TITLE
========================= */

.section-title{

    text-align:center;

    font-size:42px;

    font-weight:800;

    margin-bottom:15px;

    color:#0f172a;

}

.section-subtitle{

    text-align:center;

    color:#64748b;

    margin-bottom:55px;

}

/* =========================
        CONTACTS
========================= */

.contacts{

    padding:90px 0;

}

.contacts-grid{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:35px;

}

.contact-card{

    background:white;

    border-radius:24px;

    padding:35px;

    box-shadow:0 12px 35px rgba(0,0,0,.06);

}

.contact-card h3{

    margin-bottom:25px;

}

.contact-item{

    display:flex;

    gap:18px;

    margin-bottom:22px;

}

.contact-icon{

    width:55px;

    height:55px;

    display:flex;

    justify-content:center;

    align-items:center;

    border-radius:16px;

    background:#dbeafe;

    font-size:24px;

}

/* =========================
        FORM
========================= */

.contact-form{

    display:flex;

    flex-direction:column;

    gap:18px;

}

.contact-form input,

.contact-form textarea,

.contact-form select{

    width:100%;

    padding:16px;

    border:1px solid #dbe3ef;

    border-radius:14px;

    outline:none;

    transition:.25s;

    font-size:15px;

}

.contact-form input:focus,

.contact-form textarea:focus,

.contact-form select:focus{

    border-color:#2563eb;

    box-shadow:0 0 0 4px rgba(37,99,235,.12);

}

.contact-form textarea{

    resize:none;

    min-height:140px;

}

/* =========================
         FOOTER
========================= */

.footer{

    padding:60px 0;

    margin-top:80px;

    background:#111827;

    color:white;

}

.footer-grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:40px;

}

.footer h3{

    margin-bottom:18px;

}

.footer a{

    display:block;

    color:#cbd5e1;

    text-decoration:none;

    margin-bottom:10px;

    transition:.25s;

}

.footer a:hover{

    color:white;

    transform:translateX(4px);

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

.features-grid{

    grid-template-columns:repeat(2,1fr);

}

.contacts-grid{

    grid-template-columns:1fr;

}

.footer-grid{

    grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:768px){

h1{

    font-size:42px;

}

.section-title{

    font-size:34px;

}

.hero{

    padding:70px 0;

}

.features-grid{

    grid-template-columns:1fr;

}

.footer-grid{

    grid-template-columns:1fr;

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

.feature-card{

    padding:25px;

}

.contact-card{

    padding:25px;

}

.submit-btn{

    height:54px;

}

}

</style>