<template>
  <footer class="footer">

    <div class="container footer-grid">

      <div class="footer-block">
        <h3>Servis53</h3>
        <p>Ремонт и продажа техники с гарантией качества.</p>
      </div>

      <div class="footer-block">
        <h4>Навигация</h4>
        <a href="#">Главная</a>
        <a href="#">Услуги</a>
        <a href="#">Магазин</a>
        <a href="#">Контакты</a>
      </div>

      <div class="footer-block">
        <h4>Контакты</h4>
        <p>📍 Великий Новгород</p>
        <p>📞 +7 (999) 123-45-67</p>
        <p>✉ info@servis53.ru</p>
      </div>

      <div class="footer-block">
        <h4>Мы в соцсетях</h4>
        <a href="#">VK</a>
        <a href="#">Telegram</a>
        <a href="#">YouTube</a>
      </div>

    </div>

    <div class="footer-bottom">
      © 2026 Servis53. Все права защищены.
    </div>

  </footer>
</template>

<style scoped>

.footer{
    background:#0f172a;
    color:white;
    padding:80px 0 20px;
    margin-top:100px;
}

.footer-grid{
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    gap:40px;
}

.footer-block h3{
    font-size:24px;
    margin-bottom:10px;
    color:#2563eb;
}

.footer-block h4{
    margin-bottom:15px;
}

.footer-block p,
.footer-block a{
    display:block;
    color:#cbd5e1;
    margin-bottom:8px;
    text-decoration:none;
    transition:0.3s;
}

.footer-block a:hover{
    color:#2563eb;
}

.footer-bottom{
    text-align:center;
    margin-top:50px;
    padding-top:20px;
    border-top:1px solid #1e293b;
    color:#94a3b8;
}

@media(max-width:900px){
    .footer-grid{
        grid-template-columns:1fr 1fr;
    }
}

@media(max-width:600px){
    .footer-grid{
        grid-template-columns:1fr;
        text-align:center;
    }
}
</style>