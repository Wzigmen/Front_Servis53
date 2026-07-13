<template>

    <div class="profile-page">

        <div class="container">

            <div class="avatar">

                <img v-if="avatarUrl" :src="avatarUrl" />

                <span v-else>

                    {{ firstLetter }}

                </span>

                <label class="avatar-upload">

                    📷

                    <input hidden type="file" accept="image/*" @change="uploadAvatar" />

                </label>

            </div>

            <div class="info-grid">

                <div class="info-card">

                    <span class="title">

                        Логин

                    </span>

                    <span class="value">

                        {{ auth.user?.login }}

                    </span>

                </div>

                <div class="info-card">

                    <span class="title">

                        Email

                    </span>

                    <span class="value">

                        {{ auth.user?.email }}

                    </span>

                </div>

                <div class="info-card">

                    <span class="title">

                        ID пользователя

                    </span>

                    <span class="value">

                        #{{ auth.user?.id }}

                    </span>

                </div>

                <div class="info-card">

                    <span class="title">

                        Роль

                    </span>

                    <span class="value">

                        {{ auth.user?.role }}

                    </span>

                </div>

            </div>

            <div class="buttons">

                <button class="edit">

                    ✏ Редактировать профиль

                </button>

                <button class="logout" @click="logout">

                    🚪 Выйти

                </button>

            </div>

        </div>

    </div>

</template>

<script setup>
import api from "@/api/api";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const firstLetter = computed(() => {

    if (!auth.user?.fullName)
        return "?";

    return auth.user.fullName[0].toUpperCase();

});

const avatarUrl = computed(() => {

    if (!auth.user?.avatar)
        return null;

    return `http://localhost:5263/images/avatars/${auth.user.avatar}`;

});

function logout() {

    auth.logout();

    router.push("/");

}

async function uploadAvatar(e) {

     console.log("Файл выбран");
    const file = e.target.files[0];

    if (!file)
        return;

    const form = new FormData();

    form.append("file", file);

    await api.post("/users/avatar", form, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

    await auth.fetchUser();
console.log(auth.user);
}
</script>

<style scoped>
.profile-page {

    padding: 70px 0;

    min-height: 100vh;

}

.profile-card {

    background: white;

    border-radius: 35px;

    padding: 60px;

    text-align: center;

    box-shadow: 0 20px 60px rgba(0, 0, 0, .08);

    animation: show .7s;

}

.avatar {

    position: relative;

    width: 170px;

    height: 170px;

    margin: auto;

    border-radius: 50%;

    overflow: hidden;

    cursor: pointer;

    background: linear-gradient(135deg, #2563eb, #5aa9ff);

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 62px;

    color: white;

    transition: .35s;

}

.avatar img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}

.avatar-upload {

    position: absolute;

    inset: 0;

    display: flex;

    justify-content: center;

    align-items: center;

    font-size: 42px;

    color: white;

    background: rgba(0, 0, 0, .45);

    opacity: 0;

    transition: .35s;

}

.avatar:hover {

    transform: scale(1.05);

}

.avatar:hover .avatar-upload {

    opacity: 1;

}

h1 {

    font-size: 42px;

    margin: 0;

}

.role {

    margin-top: 15px;

    display: inline-block;

    padding: 8px 20px;

    border-radius: 999px;

    background: #eef5ff;

    color: #2563eb;

    font-weight: 700;

}

.info-grid {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 25px;

    margin-top: 45px;

}

.info-card {

    background: white;

    border-radius: 22px;

    padding: 30px;

    display: flex;

    flex-direction: column;

    gap: 15px;

    box-shadow: 0 10px 30px rgba(0, 0, 0, .05);

    transition: .35s;

}

.info-card:hover {

    transform: translateY(-6px);

    box-shadow: 0 20px 40px rgba(0, 0, 0, .09);

}

.title {

    color: #777;

    font-size: 14px;

    text-transform: uppercase;

    letter-spacing: 1px;

}

.value {

    font-size: 22px;

    font-weight: 700;

}

.buttons {

    display: flex;

    gap: 20px;

    margin-top: 40px;

}

.edit {

    flex: 1;

    border: none;

    border-radius: 18px;

    background: #2563eb;

    color: white;

    padding: 18px;

    font-size: 18px;

    cursor: pointer;

    transition: .3s;

}

.edit:hover {

    transform: translateY(-3px);

    box-shadow: 0 15px 35px rgba(37, 99, 235, .3);

}

.logout {

    flex: 1;

    border: none;

    border-radius: 18px;

    background: white;

    color: #ef4444;

    border: 2px solid #ef4444;

    padding: 18px;

    font-size: 18px;

    cursor: pointer;

    transition: .3s;

}

.logout:hover {

    background: #ef4444;

    color: white;

}

@keyframes show {

    from {

        opacity: 0;

        transform: translateY(40px);

    }

    to {

        opacity: 1;

        transform: none;

    }

}

@media(max-width:900px) {

    .info-grid {

        grid-template-columns: 1fr;

    }

    .buttons {

        flex-direction: column;

    }

}
</style>