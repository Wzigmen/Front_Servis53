<template>
<section class="advantages">

    <div class="container">

        <h2>
            Почему выбирают Servis53
        </h2>

        <div class="grid">

            <div class="card">

                <div class="icon">
                    🛡
                </div>

                <h3>
                    Гарантия
                </h3>

                <p>
                    До 12 месяцев
                    на выполненные работы.
                </p>

            </div>

            <div class="card">

                <div class="icon">
                    ⚡
                </div>

                <h3>
                    Быстрый ремонт
                </h3>

                <p>
                    Большинство устройств
                    ремонтируем за один день.
                </p>

            </div>

            <div class="card">

                <div class="icon">
                    💰
                </div>

                <h3>
                    Честные цены
                </h3>

                <p>
                    Стоимость известна
                    до начала ремонта.
                </p>

            </div>

            <div class="card">

                <div class="icon">
                    ⭐
                </div>

                <h3>
                    Опыт
                </h3>

                <p>
                    Более 2500 успешно
                    выполненных ремонтов.
                </p>

            </div>

        </div>

    </div>

</section>
</template>

<style scoped>

.advantages{

    padding:120px 0;

}

h2{

    text-align:center;

    font-size:42px;

    margin-bottom:70px;

}

.grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:30px;

}

.card{

    background:white;

    border-radius:22px;

    padding:40px;

    box-shadow:var(--shadow);

    transition:.35s;

}

.card:hover{

    transform:translateY(-10px);

}

.icon{

    font-size:46px;

    margin-bottom:25px;

}

.card h3{

    margin-bottom:15px;

    font-size:24px;

}

.card p{

    color:var(--text-light);

    line-height:1.6;

}

@media(max-width:1000px){

.grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:650px){

.grid{

grid-template-columns:1fr;

}

}

</style>