<template>

    <div class="profile-page">

        <div class="container">

            <div class="avatar">

                <img v-if="avatar" :src="avatar" />

                <span v-else>

                    {{ firstLetter }}

                </span>

                <label class="avatar-upload">

                    📷

                    <input hidden type="file" accept="image/*" @change="changeAvatar" />

                </label>

            </div>

            <div class="profile-name">

                <h1>{{ auth.user?.fullName || auth.user?.login }}</h1>

                <div class="role">{{ auth.user?.role }}</div>

            </div>

            <!-- Просмотр -->
            <div v-if="!editing" class="info-grid">

                <div class="info-card">
                    <span class="title">Логин</span>
                    <span class="value">{{ auth.user?.login }}</span>
                </div>

                <div class="info-card">
                    <span class="title">Email</span>
                    <span class="value">{{ auth.user?.email || "—" }}</span>
                </div>

                <div class="info-card">
                    <span class="title">Телефон</span>
                    <span class="value">{{ auth.user?.phone || "—" }}</span>
                </div>

                <div class="info-card">
                    <span class="title">ID пользователя</span>
                    <span class="value">#{{ auth.user?.id }}</span>
                </div>

            </div>

            <!-- Редактирование -->
            <form v-else class="info-grid" @submit.prevent="saveProfile">

                <label class="info-card">
                    <span class="title">Имя</span>
                    <input v-model="profileForm.fullName" class="edit-input" maxlength="100">
                </label>

                <label class="info-card">
                    <span class="title">Email</span>
                    <input v-model="profileForm.email" class="edit-input" type="email" maxlength="100">
                </label>

                <label class="info-card">
                    <span class="title">Телефон</span>
                    <input v-model="profileForm.phone" class="edit-input" type="tel" maxlength="20">
                </label>

            </form>

            <div class="profile-section">

                <button class="orders-toggle" @click="showOrders = !showOrders">

                    📦 Мои заказы

                    <span>

                        {{ showOrders ? "▲" : "▼" }}

                    </span>

                </button>

                <div v-if="showOrders" class="orders-list">

                    <p v-if="orders.length === 0" class="empty-orders">

                        У вас пока нет заказов

                    </p>

                    <div v-for="order in orders" :key="order.id" class="order-card">

                        <div class="order-header" @click="toggleOrder(order.id)">

                            <div>

                                <strong>

                                    Заказ №{{ order.id }}

                                </strong>

                                <p>

                                    {{ formatDate(order.orderDate) }}

                                </p>

                            </div>

                            <div class="order-right">

                                <span class="status">

                                    {{ order.status }}

                                </span>

                                <strong>

                                    {{ formatPrice(order.totalPrice) }} ₽

                                </strong>

                                <div>

                                    {{ openedOrder === order.id ? "▲" : "▼" }}

                                </div>

                            </div>

                        </div>

                        <div v-if="openedOrder === order.id" class="order-items">

                            <div v-for="item in order.items" :key="item.productId" class="order-item">

                                <span>

                                    {{ item.productName }}

                                </span>

                                <span>

                                    {{ item.quantity }} × {{ formatPrice(item.price) }} ₽

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="buttons">

                <template v-if="editing">

                    <button class="edit" :disabled="saving" @click="saveProfile">
                        💾 Сохранить
                    </button>

                    <button class="logout" @click="editing = false">
                        ✖ Отмена
                    </button>

                </template>

                <template v-else>

                    <button class="edit" @click="startEdit">
                        ✏ Редактировать профиль
                    </button>

                    <button class="logout" @click="logout">
                        🚪 Выйти
                    </button>

                </template>

            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { getMyOrders } from "@/api/orders";
import { uploadAvatar, updateProfile } from "@/api/users";
import { avatarUrl, errorMessage } from "@/api/api";

const auth = useAuthStore();
const router = useRouter();
const orders = ref([]);
const showOrders = ref(false);
const openedOrder = ref(null);
const editing = ref(false);
const saving = ref(false);
const profileForm = ref({ fullName: "", email: "", phone: "" });

function toggleOrder(id) {

    openedOrder.value = openedOrder.value === id ? null : id;

}

const firstLetter = computed(() => {

    const name = auth.user?.fullName || auth.user?.login;

    return name ? name[0].toUpperCase() : "?";

});

const avatar = computed(() => avatarUrl(auth.user?.avatar));

function logout() {

    auth.logout();

    router.push("/");

}

function startEdit() {

    profileForm.value = {
        fullName: auth.user?.fullName ?? "",
        email: auth.user?.email ?? "",
        phone: auth.user?.phone ?? ""
    };

    editing.value = true;
}

async function saveProfile() {

    saving.value = true;

    try {

        const { data } = await updateProfile({
            fullName: profileForm.value.fullName,
            // пустой email не проходит серверную валидацию — отправляем null
            email: profileForm.value.email || null,
            phone: profileForm.value.phone
        });

        auth.user = data;

        editing.value = false;

    }
    catch (e) {

        console.error(e);

        alert(errorMessage(e, "Не удалось сохранить профиль"));

    }
    finally {

        saving.value = false;

    }
}

async function changeAvatar(e) {

    console.log("Файл выбран");
    const file = e.target.files[0];

    if (!file)
        return;

    try {

        await uploadAvatar(file);

        await auth.fetchUser();
        console.log(auth.user);

    }
    catch (err) {

        console.error(err);

        alert(errorMessage(err, "Не удалось загрузить аватар"));

    }
    finally {

        e.target.value = "";

    }
}

async function loadOrders() {

    try {

        const { data } = await getMyOrders();

        orders.value = data;

    }
    catch (e) {

        console.error(e);

    }

}

function formatDate(date) {

    return new Date(date).toLocaleDateString("ru-RU");

}

function formatPrice(price) {

    return Number(price).toLocaleString("ru-RU");

}

onMounted(loadOrders);
</script>

<style scoped>
.profile-page {

    padding: 70px 0;

    min-height: 100vh;

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

.order-card {

    padding: 20px;

    border: 1px solid #e5e7eb;

    border-radius: 14px;

    margin-bottom: 15px;

    background: white;

}

.order-right {

    text-align: right;

}

.status {

    display: inline-block;

    padding: 5px 12px;

    border-radius: 20px;

    background: #dbeafe;

    color: #2563eb;

    font-size: 14px;

    margin-bottom: 8px;

}

.order-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    cursor: pointer;

}

.order-items {

    margin-top: 18px;

    border-top: 1px solid #ececec;

    padding-top: 15px;

}

.order-item {

    display: flex;

    justify-content: space-between;

    padding: 8px 0;

}

.profile-section {

    margin-top: 40px;

}

.orders-toggle {

    width: 100%;

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 18px 22px;

    background: #fff;

    border: 1px solid #e5e7eb;

    border-radius: 16px;

    cursor: pointer;

    font-size: 18px;

    font-weight: 700;

    transition: .25s;

}

.orders-toggle:hover {

    background: #f8fafc;

    border-color: #2563eb;

}

.orders-list {

    margin-top: 20px;

}

.empty-orders {

    padding: 25px;

    text-align: center;

    color: #64748b;

}

.profile-name {

    margin-top: 25px;

    text-align: center;

    animation: show .7s;

}

.edit-input {

    padding: 12px 14px;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    font-size: 18px;

}

.edit-input:focus {

    border-color: #2563eb;

}

.edit:disabled {

    opacity: .6;

    cursor: wait;

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
