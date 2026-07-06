<template>
  <section class="hero">

    <div class="container hero-container">

      <div class="hero-left">

        <span class="badge">
          Сервисный центр №1 в Великом Новгороде
        </span>

        <h1>
          Ремонт техники
          <span>быстро</span>,
          <span>качественно</span>
          и с гарантией.
        </h1>

        <p>
          Ремонтируем телефоны, ноутбуки, компьютеры,
          игровые приставки и другую электронику.
          Также продаём новую и проверенную б/у технику.
        </p>

        <div class="buttons">

          <button class="btn">
            Оставить заявку
          </button>

          <button class="btn-secondary">
            Перейти в магазин
          </button>

        </div>

        <div class="stats">

          <div>
            <h2>2500+</h2>
            <span>ремонтов</span>
          </div>

          <div>
            <h2>98%</h2>
            <span>довольных клиентов</span>
          </div>

          <div>
            <h2>12 мес.</h2>
            <span>гарантия</span>
          </div>

        </div>

      </div>

      <div class="hero-right">

  <div class="glow"></div>

    <img src="@/assets/images/hero/laptop.png" class="device laptop" />
    <img src="@/assets/images/hero/phone.png" class="device phone" />
    <img src="@/assets/images/hero/headphones.png" class="device headphones" />

</div>

    </div>

  </section>
  <section class="features">

  <div class="container">

    <h2 class="section-title">
      Почему выбирают нас
    </h2>

    <p class="section-subtitle">
      Быстро. Надёжно. С гарантией.
    </p>

    <div class="features-grid">

      <div class="feature-card">
        <div class="icon">⚡</div>
        <h3>Быстрый ремонт</h3>
        <p>Большинство устройств ремонтируем в течение 1 дня</p>
      </div>

      <div class="feature-card">
        <div class="icon">🛡️</div>
        <h3>Гарантия</h3>
        <p>До 12 месяцев гарантии на все виды ремонта</p>
      </div>

      <div class="feature-card">
        <div class="icon">💰</div>
        <h3>Честные цены</h3>
        <p>Без скрытых платежей и навязанных услуг</p>
      </div>

      <div class="feature-card">
        <div class="icon">📦</div>
        <h3>Запчасти в наличии</h3>
        <p>Используем только проверенные комплектующие</p>
      </div>

    </div>

  </div>

</section>
<section class="services">

  <div class="container">

    <h2 class="section-title">
      Наши услуги
    </h2>

    <p class="section-subtitle">
      Ремонт любой техники — от телефонов до ПК
    </p>

    <div class="services-grid">

      <div class="service-card">
        <div class="service-icon">📱</div>
        <h3>Ремонт телефонов</h3>
        <p>Замена экранов, батарей, восстановление после воды</p>
        <span>от 990 ₽</span>
      </div>

      <div class="service-card">
        <div class="service-icon">💻</div>
        <h3>Ремонт ноутбуков</h3>
        <p>Материнские платы, чистка, замена комплектующих</p>
        <span>от 1490 ₽</span>
      </div>

      <div class="service-card">
        <div class="service-icon">🖥️</div>
        <h3>Ремонт ПК</h3>
        <p>Сборка, апгрейд, диагностика и ремонт</p>
        <span>от 990 ₽</span>
      </div>

      <div class="service-card">
        <div class="service-icon">⚙️</div>
        <h3>Диагностика</h3>
        <p>Полная проверка устройства и выявление проблем</p>
        <span>Бесплатно</span>
      </div>

    </div>

  </div>

</section>
<section class="products">

  <div class="container">

    <h2 class="section-title">
      Популярные товары
    </h2>

    <p class="section-subtitle">
      Лучшие предложения магазина Servis53
    </p>

    <div class="products-grid">

      <div class="product-card">

        <div class="product-image">
          <span class="heart">❤️</span>
          <img src="@/assets/images/hero/laptop.png" />
        </div>

        <h3>ASUS VivoBook 15</h3>

        <div class="rating">⭐⭐⭐⭐☆</div>

        <div class="price">59 990 ₽</div>

        <button>В корзину</button>

      </div>

      <div class="product-card">

        <div class="product-image">
          <span class="heart">❤️</span>
          <img src="@/assets/images/hero/laptop.png" />
        </div>

        <h3>Lenovo IdeaPad</h3>

        <div class="rating">⭐⭐⭐⭐⭐</div>

        <div class="price">49 990 ₽</div>

        <button>В корзину</button>

      </div>

      <div class="product-card">

        <div class="product-image">
          <span class="heart">❤️</span>
          <img src="@/assets/images/hero/laptop.png" />
        </div>

        <h3>HP Pavilion</h3>

        <div class="rating">⭐⭐⭐⭐☆</div>

        <div class="price">54 990 ₽</div>

        <button>В корзину</button>

      </div>

    </div>

  </div>

</section>
<section class="cta">

  <div class="container cta-box">

    <div class="cta-text">

      <h2>Нужен срочный ремонт?</h2>

      <p>
        Оставьте заявку и мы свяжемся с вами в течение 10 минут.
        Диагностика бесплатно.
      </p>

    </div>

    <div class="cta-form">

      <input type="text" placeholder="Ваше имя" />
      <input type="text" placeholder="Телефон" />
      <input type="text" placeholder="Описание проблемы" />

      <button>Отправить заявку</button>

    </div>

  </div>

</section>
</template>

<script setup>
</script>

<style scoped>

.hero{

    padding:90px 0;

}

.hero-container{

    display:grid;

    grid-template-columns:1fr 1fr;

    align-items:center;

    gap:80px;

}

.badge{

    display:inline-block;

    padding:10px 18px;

    background:#dbeafe;

    color:#2563eb;

    border-radius:999px;

    margin-bottom:25px;

    font-weight:600;

}

.hero h1{

    font-size:64px;

    line-height:1.1;

    margin-bottom:30px;

}

.hero h1 span{

    color:#2563eb;

}

.hero p{

    color:#6b7280;

    font-size:20px;

    line-height:1.7;

    margin-bottom:35px;

}

.buttons{

    display:flex;

    gap:20px;

    margin-bottom:55px;

}

.btn-secondary{

    padding:15px 28px;

    background:white;

    border:2px solid #2563eb;

    color:#2563eb;

    border-radius:14px;

    transition:.3s;

}

.btn-secondary:hover{

    background:#2563eb;

    color:white;

}

.stats{

    display:flex;

    gap:50px;

}

.stats h2{

    color:#2563eb;

    font-size:34px;

}

.stats span{

    color:#6b7280;

}

.hero-right{

    position:relative;

    display:flex;

    justify-content:center;

}

.circle{

    position:absolute;

    width:520px;

    height:520px;

    border-radius:50%;

    background:#dbeafe;

    filter:blur(30px);

}

.laptop{

    position:relative;

    width:600px;

    z-index:2;

}

@media(max-width:1100px){

.hero-container{

grid-template-columns:1fr;

text-align:center;

}

.buttons{

justify-content:center;

}

.stats{

justify-content:center;

}

}
.hero-right{
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:600px;
}

/* мягкое свечение */
.glow{
    position:absolute;
    width:500px;
    height:500px;
    background:radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%);
    filter:blur(20px);
    border-radius:50%;
}

/* общие стили устройств */
.device{
    position:absolute;
    width:220px;
    z-index:2;
    transition:0.4s ease;
    animation:float 6s ease-in-out infinite;
}

/* расположение */
.laptop{
    width:360px;
    z-index:3;
}

.phone{
    width:160px;
    top:60px;
    left:-40px;
    animation-delay:1s;
}

.headphones{
    width:180px;
    bottom:40px;
    right:-30px;
    animation-delay:2s;
}

/* плавное “парение” */
@keyframes float{
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
}

/* hover эффект */
.hero-right:hover .device{
    transform: scale(1.05);
}

.features{
    padding:100px 0;
    background:#f8fafc;
}

.section-title{
    text-align:center;
    font-size:42px;
    margin-bottom:10px;
}

.section-subtitle{
    text-align:center;
    color:#6b7280;
    margin-bottom:60px;
}

.features-grid{
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    gap:25px;
}

.feature-card{
    background:white;
    padding:30px;
    border-radius:18px;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.05);
    transition:0.3s ease;
}

.feature-card:hover{
    transform:translateY(-8px);
    box-shadow:0 15px 35px rgba(0,0,0,0.1);
}

.icon{
    font-size:40px;
    margin-bottom:15px;
}

.feature-card h3{
    margin-bottom:10px;
}

.feature-card p{
    color:#6b7280;
    font-size:14px;
}

/* адаптив */
@media(max-width:1000px){
    .features-grid{
        grid-template-columns:repeat(2, 1fr);
    }
}

@media(max-width:600px){
    .features-grid{
        grid-template-columns:1fr;
    }
}

.services{
    padding:100px 0;
    background:white;
}

.services-grid{
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    gap:25px;
}

.service-card{
    background:#f8fafc;
    padding:30px;
    border-radius:18px;
    transition:0.3s ease;
    border:1px solid #eee;
}

.service-card:hover{
    transform:translateY(-10px);
    box-shadow:0 15px 35px rgba(0,0,0,0.08);
    background:white;
}

.service-icon{
    font-size:40px;
    margin-bottom:15px;
}

.service-card h3{
    margin-bottom:10px;
}

.service-card p{
    color:#6b7280;
    font-size:14px;
    margin-bottom:15px;
}

.service-card span{
    font-weight:700;
    color:#2563eb;
}

/* адаптив */
@media(max-width:1000px){
    .services-grid{
        grid-template-columns:repeat(2, 1fr);
    }
}

@media(max-width:600px){
    .services-grid{
        grid-template-columns:1fr;
    }
}

.products{
    padding:100px 0;
    background:#f8fafc;
}

.products-grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:25px;
}

.product-card{
    background:white;
    padding:20px;
    border-radius:18px;
    box-shadow:0 10px 25px rgba(0,0,0,0.05);
    transition:0.3s ease;
    text-align:center;
}

.product-card:hover{
    transform:translateY(-10px);
}

.product-image{
    position:relative;
    height:180px;
    display:flex;
    justify-content:center;
    align-items:center;
}

.product-image img{
    max-height:160px;
    object-fit:contain;
}

.heart{
    position:absolute;
    top:10px;
    right:10px;
    cursor:pointer;
}

.rating{
    margin:10px 0;
    color:#f59e0b;
}

.price{
    font-size:20px;
    font-weight:700;
    color:#2563eb;
    margin-bottom:10px;
}

.product-card button{
    width:100%;
    padding:12px;
    border:none;
    border-radius:12px;
    background:#2563eb;
    color:white;
    cursor:pointer;
    transition:0.3s;
}

.product-card button:hover{
    background:#1d4ed8;
}

/* адаптив */
@media(max-width:1000px){
    .products-grid{
        grid-template-columns:repeat(2, 1fr);
    }
}

@media(max-width:600px){
    .products-grid{
        grid-template-columns:1fr;
    }
}

.cta{
    padding:100px 0;
    background:#2563eb;
}

.cta-box{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:60px;
    align-items:center;

    background:white;
    padding:50px;
    border-radius:20px;
}

.cta-text h2{
    font-size:36px;
    margin-bottom:15px;
}

.cta-text p{
    color:#6b7280;
    font-size:18px;
    line-height:1.6;
}

.cta-form{
    display:flex;
    flex-direction:column;
    gap:15px;
}

.cta-form input{
    padding:14px;
    border:1px solid #ddd;
    border-radius:12px;
    outline:none;
    transition:0.3s;
}

.cta-form input:focus{
    border-color:#2563eb;
}

.cta-form button{
    padding:14px;
    border:none;
    border-radius:12px;
    background:#2563eb;
    color:white;
    cursor:pointer;
    transition:0.3s;
}

.cta-form button:hover{
    background:#1d4ed8;
}

/* адаптив */
@media(max-width:900px){
    .cta-box{
        grid-template-columns:1fr;
        text-align:center;
    }
}

</style>