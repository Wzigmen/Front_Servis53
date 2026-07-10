<template>
<div class="overlay" @click="$emit('close')">

    <div class="modal" @click.stop>

        <div class="icon">
            👤
        </div>

        <h2>
            Добро пожаловать
        </h2>

        <p>
            Войдите в свой аккаунт
        </p>

        <input
            v-model="login"
            placeholder="Логин"
        >

        <input
            v-model="password"
            type="password"
            placeholder="Пароль"
        >

        <label class="remember">

            <input type="checkbox">

            Запомнить меня

        </label>

        <button
            @click="loginUser"
            :disabled="loading"
        >

            {{ loading ? "Вход..." : "Войти" }}

        </button>

        <div
            v-if="error"
            class="error"
        >
            {{ error }}
        </div>

    </div>

</div>
</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";

const emit=defineEmits(["close"]);

const auth=useAuthStore();

const login=ref("");

const password=ref("");

const loading=ref(false);

const error=ref("");

async function loginUser(){

    loading.value=true;

    error.value="";

    try{

        await auth.login({

            login:login.value,

            password:password.value

        });

        emit("close");

    }

    catch{

        error.value="Неверный логин или пароль";

    }

    finally{

        loading.value=false;

    }

}
</script>

<style scoped>

.overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.35);

    backdrop-filter:blur(8px);

    display:flex;

    justify-content:center;

    align-items:center;

    z-index:9999;

    animation:fade .25s;

}

.modal{

    width:420px;

    background:white;

    border-radius:26px;

    padding:40px;

    box-shadow:0 30px 70px rgba(0,0,0,.18);

    animation:popup .3s;

}

.icon{

    width:90px;

    height:90px;

    margin:auto;

    border-radius:50%;

    background:#edf5ff;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:40px;

    margin-bottom:20px;

}

h2{

    text-align:center;

    margin-bottom:5px;

}

p{

    text-align:center;

    color:#777;

    margin-bottom:30px;

}

input{

    width:100%;

    box-sizing:border-box;

    margin-bottom:15px;

    padding:15px;

    border-radius:14px;

    border:1px solid #ddd;

    outline:none;

    transition:.2s;

}

input:focus{

    border-color:#2563eb;

}

.remember{

    display:flex;

    align-items:center;

    gap:10px;

    margin-bottom:25px;

}

button{

    width:100%;

    padding:15px;

    border:none;

    border-radius:14px;

    background:#2563eb;

    color:white;

    font-size:16px;

    font-weight:600;

    cursor:pointer;

    transition:.25s;

}

button:hover{

    transform:translateY(-2px);

    box-shadow:0 12px 35px rgba(37,99,235,.35);

}

.error{

    margin-top:18px;

    text-align:center;

    color:red;

}

@keyframes popup{

    from{

        opacity:0;

        transform:translateY(-40px) scale(.9);

    }

    to{

        opacity:1;

        transform:translateY(0) scale(1);

    }

}

@keyframes fade{

    from{

        opacity:0;

    }

    to{

        opacity:1;

    }

}

</style>