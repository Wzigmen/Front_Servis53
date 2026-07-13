<template>

<div class="profile-page">

    <div class="profile-card">

        <div class="avatar">

            {{ firstLetter }}

        </div>

        <h1>

            {{ auth.user?.fullName }}

        </h1>

        <div class="role">

            {{ auth.user?.roleName }}

        </div>

    </div>

</div>

</template>

<script setup>

import {computed} from "vue";
import {useAuthStore} from "@/stores/auth";

const auth=useAuthStore();

const firstLetter=computed(()=>{

    if(!auth.user?.fullName)
        return "U";

    return auth.user.fullName[0].toUpperCase();

});

</script>

<style scoped>

.profile-page{

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:flex-start;

    padding:70px;

}

.profile-card{

    width:520px;

    background:white;

    border-radius:32px;

    padding:50px;

    text-align:center;

    box-shadow:0 20px 60px rgba(0,0,0,.08);

    animation:show .7s;

}

.avatar{

    width:130px;

    height:130px;

    margin:auto;

    border-radius:50%;

    background:linear-gradient(135deg,#2563eb,#4f8cff);

    color:white;

    font-size:56px;

    font-weight:700;

    display:flex;

    align-items:center;

    justify-content:center;

    margin-bottom:25px;

}

h1{

    font-size:34px;

    margin:0;

}

.role{

    margin-top:15px;

    color:#2563eb;

    font-weight:700;

}

@keyframes show{

    from{

        opacity:0;

        transform:translateY(40px);

    }

    to{

        opacity:1;

        transform:none;

    }

}

</style>