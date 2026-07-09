<template>
  <section class="services section">
    <div class="container">

      <div class="section-title">
        <span>Наши услуги</span>
        <h2>Ремонтируем любую технику</h2>
      </div>

      <div class="services-grid">

        <div
          class="service-card"
          v-for="service in services"
          :key="service.title"
        >

          <div class="service-icon">

            <i :class="service.icon"></i>

          </div>

          <h3>{{ service.title }}</h3>

          <p>{{ service.description }}</p>

          <button>
            Подробнее
          </button>

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>

const services = [

{
title:"Ремонт телефонов",
description:"iPhone, Samsung, Xiaomi и другие бренды.",
icon:"fa-solid fa-mobile-screen-button"
},

{
title:"Ремонт ноутбуков",
description:"Замена матриц, клавиатур, чистка, пайка.",
icon:"fa-solid fa-laptop"
},

{
title:"Ремонт ПК",
description:"Диагностика, модернизация и ремонт компьютеров.",
icon:"fa-solid fa-desktop"
},

{
title:"Игровые приставки",
description:"PlayStation, Xbox, Nintendo Switch.",
icon:"fa-solid fa-gamepad"
},

{
title:"Смарт-часы",
description:"Apple Watch, Samsung Galaxy Watch и другие.",
icon:"fa-solid fa-clock"
},

{
title:"Обслуживание",
description:"Чистка, замена термопасты, настройка Windows.",
icon:"fa-solid fa-screwdriver-wrench"
}

]

</script>

<style scoped>

.section-title{

text-align:center;

margin-bottom:70px;

}

.section-title span{

color:var(--primary);

font-weight:600;

}

.section-title h2{

font-size:44px;

margin-top:12px;

}

.services-grid{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:30px;

}

.service-card{

background:white;

border-radius:24px;

padding:35px;

transition:.35s;

box-shadow:var(--shadow);

display:flex;

flex-direction:column;

}

.service-card:hover{

transform:translateY(-12px);

}

.service-icon{

width:72px;

height:72px;

background:#eef5ff;

border-radius:18px;

display:flex;

justify-content:center;

align-items:center;

font-size:30px;

color:var(--primary);

margin-bottom:25px;

transition:.3s;

}

.service-card:hover .service-icon{

transform:scale(1.1);

}

.service-card h3{

margin-bottom:15px;

font-size:24px;

}

.service-card p{

flex:1;

color:var(--text-light);

line-height:1.7;

margin-bottom:30px;

}

.service-card button{

background:none;

color:var(--primary);

font-weight:600;

font-size:16px;

text-align:left;

}

@media(max-width:1000px){

.services-grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:650px){

.services-grid{

grid-template-columns:1fr;

}

}

</style>