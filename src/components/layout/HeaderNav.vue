<template>

<nav>

<RouterLink to="/">Главная</RouterLink>

<RouterLink to="/services">Услуги</RouterLink>

<RouterLink to="/shop">Магазин</RouterLink>

<RouterLink to="/contacts">Контакты</RouterLink>

</nav>

</template>

<style scoped>

nav{

    display:flex;

    align-items:center;

    gap:42px;

}

a{

    position:relative;

    font-weight:600;

    transition:var(--transition);

}

a:hover{

    color:var(--primary);

}

.router-link-active{

    color:var(--primary);

}

.router-link-active::after{

    content:"";

    position:absolute;

    left:0;
    bottom:-8px;

    width:100%;
    height:3px;

    border-radius:20px;

    background:var(--primary);

}

a{

font-weight:600;

transition:.3s;

}

.router-link-active{

color:var(--primary);

}

@media(max-width:992px){

nav{

display:none;

}

}

</style>