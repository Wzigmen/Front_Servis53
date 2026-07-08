<template>
  <header class="header">
    <div class="container header-container">

      <RouterLink to="/" class="logo">
        <i class="fa-solid fa-screwdriver-wrench"></i>
        <span>Servis53</span>
      </RouterLink>

      <nav class="navigation">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/services">Услуги</RouterLink>
        <RouterLink to="/shop">Магазин</RouterLink>
        <RouterLink to="/contacts">Контакты</RouterLink>
      </nav>

      <div class="header-actions">

        <button class="icon-btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <button class="icon-btn">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>

        <RouterLink class="login-btn" to="/login">
          Войти
        </RouterLink>

      </div>

    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>

.header{

    position:sticky;

    top:0;

    z-index:1000;

    background:rgba(255,255,255,.92);

    backdrop-filter:blur(18px);

    border-bottom:1px solid #ececec;

}

.header-container{

    height:82px;

    display:flex;

    justify-content:space-between;

    align-items:center;

}

.logo{

    display:flex;

    align-items:center;

    gap:12px;

    font-size:28px;

    font-weight:700;

    color:#2563eb;

}

.logo i{

    font-size:26px;

}

.navigation{

    display:flex;

    gap:38px;

}

.navigation a{

    position:relative;

    font-weight:500;

    transition:.3s;

}

.navigation a:hover{

    color:#2563eb;

}

.navigation a::after{

    content:"";

    position:absolute;

    left:0;

    bottom:-8px;

    width:0;

    height:2px;

    background:#2563eb;

    transition:.3s;

}

.navigation a:hover::after{

    width:100%;

}

.header-actions{

    display:flex;

    align-items:center;

    gap:15px;

}

.icon-btn{

    width:44px;

    height:44px;

    border:none;

    border-radius:50%;

    background:#f4f4f4;

    transition:.3s;

}

.icon-btn:hover{

    background:#2563eb;

    color:white;

}

.login-btn{

    background:#2563eb;

    color:white;

    padding:13px 28px;

    border-radius:12px;

    transition:.3s;

}

.login-btn:hover{

    background:#1d4ed8;

}

@media(max-width:900px){

.navigation{

display:none;

}

}

</style>