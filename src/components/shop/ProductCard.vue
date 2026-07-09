<template>

    <div class="card">


        <div class="image-box">

            <img v-if="product.image" :src="apiUrl + product.image" :alt="product.name">

            <div v-else class="no-image">
                📦
            </div>

        </div>



        <div class="info">


            <h3>
                {{ product.name }}
            </h3>



            <p class="category">
                {{ product.category }}
            </p>

            <p class="brand">
                {{ product.brand }}
            </p>



            <div class="bottom">


                <strong>

                    {{ Number(product.price).toLocaleString() }} ₽

                </strong>



                <button>

                    В корзину

                </button>


            </div>


        </div>


    </div>


</template>



<script setup>

defineProps({

    product: {
        type: Object,
        required: true
    }

})


const apiUrl = "http://localhost:5263";


</script>



<style scoped>
.card {

    background: white;

    border-radius: 24px;

    padding: 20px;

    box-shadow:
        0 10px 30px rgba(15, 23, 42, .08);

    transition: .3s;

}


.card:hover {

    transform: translateY(-8px);

    box-shadow:
        0 20px 40px rgba(15, 23, 42, .15);

}



.image-box {

    height: 260px;

    background: #f8fafc;

    border-radius: 20px;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

}



.image-box img {

    max-width: 90%;

    max-height: 90%;

    object-fit: contain;

}



.no-image {

    font-size: 80px;

}



.info {

    padding-top: 20px;

}



.info h3 {

    font-size: 22px;

    font-weight: 700;

    color: #0f172a;

}



.category {

    margin-top: 8px;

    color: #64748b;

}



.bottom {

    margin-top: 25px;

    display: flex;

    justify-content: space-between;

    align-items: center;

}



.bottom strong {

    font-size: 24px;

    color: #2563eb;

}



button {

    background: #2563eb;

    color: white;

    border: none;

    padding: 12px 20px;

    border-radius: 14px;

    cursor: pointer;

}


button:hover {

    background: #1d4ed8;

}
</style>